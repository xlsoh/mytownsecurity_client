import { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import Modal from '../../styles/Modal';
import SearchResultList from './SearchResultList';
import { gql } from 'apollo-boost';
import { API_KEY_SEARCH } from '../../config';

import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useStylesInput, theme, SearchContainer } from './SearchCss.js';
import { useStylesBtn } from '../../styles/globalBtnCss.js';

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
  const [locationXY, setLocationXY] = useState({});
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const searchBtn = useStylesBtn();
  const inputClasses = useStylesInput();
  const [createAddress] = useMutation(CREATE_ADDRESS);
  useEffect(() => {
    fetchData().then((res) => setResults(res.data.results.juso));
  }, [addressInput]);
  const handleSearch = (input) => {
    setIsOpen(true);
    setAddressInput(input);
  };
  //선택버튼
  const handleChecked = async (addrObj) => {
    const { roadAddr, sggNm, siNm, rn } = addrObj;
    if (siNm !== '서울특별시') {
      alert('죄송합니다. 현재는 서울 지역만 서비스하는 중입니다 🙏🏼');
      return;
    }
    setValue(roadAddr);

    const testRes = await createAddress({
      variables: {
        detail: roadAddr,
        Y: locationXY.longitudeY,
        X: locationXY.latitudeX,
        gu: sggNm,
        rn,
      },
    });

    setAddressId(testRes.data.createAddress.id);
    if (localStorage.getItem('addressId')) {
      localStorage.removeItem('addressId');
      localStorage.setItem('addressId', testRes.data.createAddress.id);
    } else {
      localStorage.setItem('addressId', testRes.data.createAddress.id);
    }

    //서버 연동 확인되면 사용!
    history.push(`/address/${testRes.data.createAddress.id}`);
  };
  // 주소 검색 API
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
    return res;
  };
  // 주소 검색 API 필수! 수정 절대 X
  function checkSearchedWord(obj) {
    if (obj.value.length > 0) {
      var expText = /[%=><]/;
      if (expText.test(obj.value) == true) {
        alert('특수문자를 입력 할수 없습니다.');
        obj.value = obj.value.split(expText).join('');
        return false;
      }
      var sqlArray = new Array(
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
    <>
      <SearchContainer>
        <ThemeProvider theme={theme}>
          <TextField
            label=' ex) 도로명(반포대로 58), 건물명(독립기념관), 지번(천호동)'
            className={inputClasses.margin}
            value={searchValue}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: '450px', height: '25px' }}
          />
        </ThemeProvider>
        <Button
          className={searchBtn.default}
          variant='contained'
          onClick={() => handleSearch(searchValue)}
        >
          검색
        </Button>
      </SearchContainer>

      {searchResults ? (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <SearchResultList
            setLocationXY={setLocationXY}
            searchResults={searchResults}
            handleChecked={handleChecked}
          />
        </Modal>
      ) : (
        <div>{console.log('검색결과가 비어있습니다')}</div>
      )}
    </>
  );
}
export default withRouter(SearchInput);
