import { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import MainHeader from './MainHeader';
import SearchInput from '../search/SearchInput';
import './main.css';
import '../search/search.css';
import MainSearchResult from './MainSearchResult';
import { gql } from 'apollo-boost';
import { API_KEY_SEARCH, API_KEY_LOCATION } from '../../config';

function Main({ setAddressId, isToken, setIsToken, userInfo, setUserInfo }) {

const CREATE_ADDRESS = gql`
  mutation createAddress(
    $detail: String!
    $gu: String!
    $rn: String!
    $Y: Float!
    $X: Float!
  ) {
    createAddress(detail: $detail, gu: $gu, rn: $rn, Y: $Y, X: $X) {
      id
    }
  }
`;

function SearchInput({ setAddressId }) {
  const [searchValue, setValue] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [searchResults, setResults] = useState('');
  const [addrLocatoin, setAddrLocation] = useState({});
  const [locationXY, setLocationXY] = useState({});
  const [gu, setGu] = useState('');
  const [rn, setRn] = useState('');
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  //const classes = useStyles();
  //const inputClasses = useStylesInput();

  const [createAddress, { data, loading, error }] = useMutation(
    CREATE_ADDRESS,
    {
      variables: {
        detail: addressInput,
        Y: locationXY.longitudeY,
        X: locationXY.latitudeX,
        gu,
        rn,
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
      rn,
    } = addrObj;
    if (siNm !== '서울특별시') {
      alert('죄송합니다. 현재는 서울 지역만 서비스하는 중입니다 🙏🏼');
      return;
    }
    setValue(roadAddr);
    setAddressInput(roadAddr);
    setAddrLocation({ admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno });
    setGu(ssgNm);
    setRn(rn);
    //서버에서 검색한 주소의 id 받아오기 - 서버랑 연동 확인 필요
    const {
      data: { addressId },
    } = await createAddress();
    if (addressId) {
      console.log(addressId);
      setAddressId(addressId);
    }
    history.push(`/address/:addressId`);
    //서버 연동 확인되면 사용!
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
      <MainHeader
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isToken={isToken}
        setIsToken={setIsToken}
      />
      <SearchInput setAddressId={setAddressId} />
      <div id='search_background'></div>
    </div>
  );
}
export default withRouter(Main);
