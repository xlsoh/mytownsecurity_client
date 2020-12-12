import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import Main from './mainPage/Main';
import Service from './servicePage/Service';
import MyPage from './myPage/MyPage';
import SignUp from './signupPage/SignUp';

function App() {
  const [isLogin, setLogin] = useState(false);

  return (
    <div>
      <Switch>
        <Route path={`/main`} render={() => <Main isLogin={isLogin} />} />
        <Route
          exact
          path={`/address/:addressId`}
          render={() => <Service isLogin={isLogin} />}
        />
        <Route
          exact
          path={`/mypage/:userId`}
          render={() => <MyPage isLogin={isLogin} />}
        />
        <Route
          exact
          path={`/user/signup`}
          render={() => <SignUp isLogin={isLogin} />}
        />
        <Route path={`/`} render={() => <Redirect to={`/main`} />} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
