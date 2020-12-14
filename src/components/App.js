import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Main from './mainPage/Main';
import Service from './servicePage/Service';
import MyPage from './myPage/MyPage';
import SignUp from './signupPage/SignUp';
import { gql } from 'apollo-boost';

const GET_USERINFO_BYTOKEN = gql`
  query getUserInfoByToken($token: String!) {
    getUserInfoByToken(token: $token)
  }
`;

function App() {
  const [isToken, setIsToken] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [addressId, setAddressId] = useState(0);

  const localToken = localStorage.getItem('token');
  console.log(localToken);
  // localToken이 없으면 실행 안하기
  const { data, loading, error } = useQuery(GET_USERINFO_BYTOKEN, {
    variables: {
      token: localToken,
    },
    skip: !localToken,
  });
  useEffect(() => {
    if (localToken) {
      if (data.token) {
        setIsToken(true);
        setUserInfo(data);

        //reload 필요한지 확인하기
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } else {
      setIsToken(false);
      return;
    }
  }, [isToken]);

  return (
    <div>
      {console.log(isToken)}
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
