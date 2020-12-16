import { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import Modal from '../../styles/Modal';
import SearchResultList from './SearchResultList';
import { gql } from 'apollo-boost';
import { API_KEY_SEARCH, API_KEY_LOCATION } from '../../config';

//guid 는 어떻게 할지 얘기 필요!!!
const CREATE_ADDRESS = gql`
  mutation createAddress(
    $detail: String!
    $Y: Float!
    $X: Float!
    $gu: String!
  ) {
    createAddress(detail: $detail, Y: $Y, X: $X, gu: $gu)
  }
`;

function SearchInput({ setAddressId }) {
  const [searchValue, setValue] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [searchResults, setResults] = useState('');
  const [addrLocatoin, setAddrLocation] = useState({});
  const [locationXY, setLocationXY] = useState({});
  const [gu, setGu] = useState('');
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const [createAddress, { data, loading, error }] = useMutation(
    CREATE_ADDRESS,
    {
      variables: {
        detail: addressInput,
        Y: locationXY.longitudeY,
        X: locationXY.latitudeX,
        gu,
      },
    }
  );

  useEffect(() => {
    fetchData().then((res) => setResults(res.data.results.juso));
  }, [addressInput]);

  const handleSearch = (input) => {
    setIsOpen(true);
    setAddressInput(input);
  };

  //선택버튼
  const handleChecked = async (addrObj) => {
    console.log(addrObj);
    const {
      admCd,
      rnMgtSn,
      udrtYn,
      buldMnnm,
      buldSlno,
      roadAddr,
      ssgNm,
      siNm,
    } = addrObj;

    if (siNm !== '서울특별시') {
      alert('죄송합니다. 현재는 서울 지역만 서비스하는 중입니다 🙏🏼');
      return;
    }

    setValue(roadAddr);
    setAddressInput(roadAddr);
    setAddrLocation({ admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno });
    setGu(ssgNm);

    //서버에서 검색한 주소의 id 받아오기
    // const {
    //   data: { addressId },
    // } = await createAddress();

    // if (addressId) {
    //   console.log(addressId);
    //   setAddressId(addressId);
    // }

    history.push(`/address/:addressId`);
    //history.push(`/address/${addressId}`);
  };

  useEffect(() => {
    fetchLocation().then((res) => {
      if (res.data.results.juso) {
        console.log(res.data.results.juso);
        const { entX, entY } = res.data.results.juso[0];
        let longitudeY = Number.parseFloat(entY);
        let latitudeX = Number.parseFloat(entX);
        setLocationXY({ latitudeX, longitudeY });
      }
    });
  }, [addrLocatoin]);

  const fetchLocation = async () => {
    const { admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno } = addrLocatoin;
    const resLocation = await axios(
      'https://www.juso.go.kr/addrlink/addrCoordApi.do',
      {
        params: {
          confmKey: API_KEY_LOCATION,
          admCd,
          rnMgtSn,
          udrtYn,
          buldSlno,
          buldMnnm,
          resultType: 'json',
        },
      }
    );
    return resLocation;
  };

  const fetchData = async () => {
    let obj = {};
    obj.value = addressInput;
    console.log(addressInput);
    if (!checkSearchedWord(obj)) {
      return;
    }
    const res = await axios('https://www.juso.go.kr/addrlink/addrLinkApi.do', {
      params: {
        confmKey: API_KEY_SEARCH,
        currentPage: 1,
        countPerPage: 30,
        keyword: addressInput,
        resultType: 'json',
      },
    });

    //console.log(res);

    return res;
  };

  //특수문자, 특정문자열(sql예약어의 앞뒤공백포함) 제거
  function checkSearchedWord(obj) {
    if (obj.value.length > 0) {
      //특수문자 제거
      var expText = /[%=><]/;
      if (expText.test(obj.value) == true) {
        alert('특수문자를 입력 할수 없습니다.');
        obj.value = obj.value.split(expText).join('');
        return false;
      }
      //특정문자열(sql예약어의 앞뒤공백포함) 제거
      var sqlArray = new Array(
        //sql 예약어
        'OR',
        'SELECT',
        'INSERT',
        'DELETE',
        'UPDATE',
        'CREATE',
        'DROP',
        'EXEC',
        'UNION',
        'FETCH',
        'DECLARE',
        'TRUNCATE'
      );
      var regex;
      for (var i = 0; i < sqlArray.length; i++) {
        regex = new RegExp(sqlArray[i], 'gi');
        if (regex.test(obj.value)) {
          alert(
            '"' + sqlArray[i] + '"와(과) 같은 특정문자로 검색할 수 없습니다.'
          );
          obj.value = obj.value.replace(regex, '');
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div>
      <input
        className='main_search_input'
        placeholder={
          ' ex) 도로명(반포대로 58), 건물명(독립기념관), 지번(삼성동 25)'
        }
        value={searchValue}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: '370px', height: '25px' }}
      />
      <button onClick={() => handleSearch(searchValue)}>검색</button>
      {searchResults ? (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <SearchResultList
            searchResults={searchResults}
            handleChecked={handleChecked}
          />
        </Modal>
      ) : (
        <div>{console.log('검색결과가 비어있습니다')}</div>
      )}
    </div>
  );
}
export default withRouter(SearchInput);
