import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Main from './mainPage/Main';
import Service from './servicePage/Service';
import MyPage from './myPage/MyPage';
import SignUp from './signupPage/SignUp';

function App() {
  const [isToken, setIsToken] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: 0,
    email: '123@email.com',
    password: '123',
  });
  const [addressId, setAddressId] = useState(0);
  const [userContent, setUserContent] = useState({});

  return (
    <div>
      {console.log(isToken)}
      {console.log(setIsToken)}
      {console.log(userInfo)}
      <Switch>
        <Route
          path={`/main`}
          render={() => (
            <Main
              isToken={isToken}
              setIsToken={setIsToken}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setUserContent={setUserContent}
              setAddressId={setAddressId}
            />
          )}
        />
        <Route
          exact
          path={`/address/:addressId`}
          render={() => (
            <Service
              isToken={isToken}
              setIsToken={setIsToken}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              addressId={addressId}
              userContent={userContent}
              setUserContent={setUserContent}
            />
          )}
        />
        <Route
          exact
          path={`/mypage/:userId`}
          render={() => (
            <MyPage
              isToken={isToken}
              userInfo={userInfo}
              userContent={userContent}
            />
          )}
        />
        <Route
          exact
          path={`/user/signup`}
          render={() => <SignUp isToken={isToken} setIsToken={setIsToken} />}
        />
        <Route path={`/`} render={() => <Redirect to={`/main`} />} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
