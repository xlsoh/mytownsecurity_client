import { useEffect, useState } from 'react';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { withRouter, useHistory } from 'react-router-dom';
import MainHeader from './Header';
import SearchInput from '../search/SearchInput';
import MainDetail from './MainDetail';
import { SerchedWtapper } from './MainCss.js';
import '../../styles/font.css';

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
      <SerchedWtapper>
        <SearchInput
          setAddressId={setAddressId}
          setSearchedAddress={setSearchedAddress}
          searchedAddress={searchedAddress}
        />
      </SerchedWtapper>
      <MainDetail />
    </>
  );
}
export default withRouter(Main);
