import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import axios from 'axios';

import Main from './mainPage/Main';
import Service from './servicePage/Service';
import MyPage from './myPage/MyPage';
import SignUp from './signupPage/SignUp';

function App() {
  const [isToken, setIsToken] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [addressId, setAddressId] = useState(0);
  const [userContent, setUserContent] = useState({
    favorites: [],
    reviews: [],
  });

  const loggedInToken = localStorage.getItem('token');
  const loggedInUserInfo = JSON.parse(localStorage.getItem('state'));
  const loggedInUser = {
    id: { ...loggedInUserInfo }.id,
    email: { ...loggedInUserInfo }.email,
  };
  const loggedInContent = {
    favorites: { ...loggedInUserInfo }.favorite,
    reviews: { ...loggedInUserInfo }.review,
  };

  useEffect(() => {
    if (loggedInToken && isToken !== true) {
      setIsToken(true);
      setUserInfo(loggedInUser);
      setUserContent(loggedInContent);
    }
  }, [isToken, userInfo]);

  const localToken = localStorage.getItem('token');
  console.log(localToken);

  // localToken이 없으면 실행 안하기
  const { data, loading, error } = useQuery(GET_USERINFO_BYTOKEN, {
    variables: {
      token: localToken,
    },
    skip: !localToken,
  });
  // useEffect(() => {
  //   if (localToken) {
  //     if (data.token) {
  //       //  setIsToken(true);
  //       setUserInfo(data);

  //       //reload 필요한지 확인하기
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2000);
  //     }
  //   } else {
  //     setIsToken(false);
  //     return;
  //   }
  // }, [isToken]);


  return (
    <div>
      {console.log('isToken', isToken)}
      {console.log('userInfo', userInfo)}
      {console.log('addressId', addressId)}
      {console.log('userContent', userContent)}
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
          render={() => (
            <SignUp
              isToken={isToken}
              setIsToken={setIsToken}
              setUserInfo={setUserInfo}
              setUserContent={setUserContent}
            />
          )}
        />
        <Route path={`/`} render={() => <Redirect to={`/main`} />} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
