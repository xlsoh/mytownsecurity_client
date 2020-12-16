import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useQuery } from 'react-apollo-hooks';
import axios from 'axios';
=======

>>>>>>> 27a33db05f1d7edce03a04619984d3ce095f3cd4
import Main from './mainPage/Main';
import Service from './servicePage/Service';
import MyPage from './myPage/MyPage';
import SignUp from './signupPage/SignUp';

function App() {
  const [isToken, setIsToken] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [addressId, setAddressId] = useState(0);

  const loggedInToken = localStorage.getItem('token');
  const loggedInUserInfo = JSON.parse(localStorage.getItem('state'));
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

  return (
    <div>
      {console.log('isToken', isToken)}
      {console.log('userInfo', userInfo)}
      {console.log('addressId', addressId)}
      <Switch>
        <Route
          path={`/main`}
          render={() => (
            <Main
              isToken={isToken}
              setIsToken={setIsToken}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setAddressId={setAddressId}
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
            />
          )}
        />
        <Route
          exact
<<<<<<< HEAD
          path={`/mypage/:userId`}
          render={() => (
            <MyPage
              isToken={isToken}
              userInfo={userInfo}
              userContent={userContent}
            />
          )}
=======
          path={`/mypage/${userInfo.id}`}
          render={() => <MyPage isToken={isToken} userInfo={userInfo} />}
>>>>>>> 27a33db05f1d7edce03a04619984d3ce095f3cd4
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
        <Route path={`/`} render={() => <Redirect to={`/main`} />} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
