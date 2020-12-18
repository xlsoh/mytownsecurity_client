import {
  Switch,
  Route,
  Redirect,
  withRouter,
  useHistory,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Main from './mainPage/Main';
import Service from './servicePage/Service';
import MyPage from './myPage/MyPage';
import SignUp from './signupPage/SignUp';

function App() {
  const [isToken, setIsToken] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [addressId, setAddressId] = useState(0);
  const [searchedAddress, setSearchedAddress] = useState('');
  const loggedInToken = localStorage.getItem('token');
  const loggedInUserInfo = JSON.parse(localStorage.getItem('state'));
  const loggedAddressId = localStorage.getItem('addressId');

  const loggedIn = {
    id: { ...loggedInUserInfo }.id,
    email: { ...loggedInUserInfo }.email,
  };

  useEffect(() => {
    if (loggedInToken && isToken !== true) {
      setIsToken(true);
      setUserInfo(loggedIn);
    }
  }, [isToken, userInfo]);

  useEffect(() => {
    if (!addressId) {
      setAddressId(loggedAddressId);
    }
  }, [addressId]);

  return (
    <div>
      {console.log('isToken', isToken)}
      {console.log('userInfo', userInfo)}
      {console.log('addressId', addressId)}
      {console.log('searchedAddress', searchedAddress)}
      <Switch>
        <Route
          exact
          path={`/main`}
          render={() => (
            <Main
              isToken={isToken}
              setIsToken={setIsToken}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setAddressId={setAddressId}
              setSearchedAddress={setSearchedAddress}
              searchedAddress={searchedAddress}
            />
          )}
        />
        <Route
          exact
          path={`/address/${addressId}`}
          render={() => (
            <Service
              isToken={isToken}
              setIsToken={setIsToken}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              addressId={addressId}
              setAddressId={setAddressId}
              searchedAddress={searchedAddress}
              setSearchedAddress={setSearchedAddress}
            />
          )}
        />
        <Route
          exact
          path={`/mypage/${userInfo.id}`}
          render={() => <MyPage isToken={isToken} userInfo={userInfo} />}
        />
        <Route
          exact
          path={`/user/signup`}
          render={() => (
            <SignUp
              isToken={isToken}
              setIsToken={setIsToken}
              setUserInfo={setUserInfo}
            />
          )}
        />
        <Route
          path={`/`}
          render={() => {
            if (document.referrer == '') {
              return <Redirect to={`/main`} />;
            }
            return <Redirect to={location.pathname} />;
          }}
        />
        {/* <Route path={`/`} render={() => <Redirect to={`/main`} />} /> */}
      </Switch>
    </div>
  );
}

export default withRouter(App);
