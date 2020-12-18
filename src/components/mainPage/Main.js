import { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import MainHeader from './Header';
import SearchInput from '../search/SearchInput';
import { MainBackground, MainCenter } from './MainCss.js';
import '../../styles/font.css';
import './main.css';

function Main({
  setAddressId,
  isToken,
  setIsToken,
  userInfo,
  setUserInfo,
  setSearchedAddress,
  searchedAddress,
}) {
  return (
    <>
      <MainHeader
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isToken={isToken}
        setIsToken={setIsToken}
      />
      <MainCenter>
        <SearchInput
          setAddressId={setAddressId}
          setSearchedAddress={setSearchedAddress}
          searchedAddress={searchedAddress}
        />

        <div className={'main_font main_first'}>
          우리 동네 안전이 궁금하다면,
        </div>
        <div className='logo_font main_second'>MyTownSecurity</div>
        <div className={'default_font main_third'}>
          주소를 검색하고 여러분의 의견을 공유해주세요
        </div>
      </MainCenter>
      <MainBackground />
    </>
  );
}
export default withRouter(Main);
