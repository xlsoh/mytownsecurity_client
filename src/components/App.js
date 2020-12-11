import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import React, { useState } from 'react';

import Main from './mainPage/Main';
import Service from './servicePage/Service';
import MyPage from './myPage/MyPage';
import SignUp from './signupPage/SignUp';

function App() {
  const [isToken, setIsToken] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [addressId, setAddressId] = useState(0);

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
            />
          )}
        />
        <Route
          exact
          path={`/mypage/:userId`}
          render={() => <MyPage isToken={isToken} userInfo={userInfo} />}
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
