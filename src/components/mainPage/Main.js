import { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import MainHeader from './Header';
import SearchInput from '../search/SearchInput';
import MainDetail from './MainDetail';
import { SerchedWtapper } from './MainCss.js';
import '../../styles/font.css';

function Main({ setAddressId, isToken, setIsToken, userInfo, setUserInfo }) {
  return (
    <>
      <MainHeader
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isToken={isToken}
        setIsToken={setIsToken}
      />
      <SerchedWtapper>
        <SearchInput setAddressId={setAddressId} />
      </SerchedWtapper>
      <MainDetail />
    </>
  );
}
export default withRouter(Main);
