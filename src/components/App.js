import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import Main from './mainPage/Main';
import Service from './servicePage/Service';
import MyPage from './myPage/MyPage';
import PropTypes from 'prop-types';

function App() {
  const [isLogin, setLogin] = useState(false);

  return (
    <div>
      hello
      <Switch>
        <Route path={`/`} render={() => <Main isLogin={isLogin} />} />
        <Route
          exactpath={`/address/:addressId`}
          render={() => <Service isLogin={isLogin} />}
        />
        <Route
          exactpath={`/mypage/:userId`}
          render={() => <MyPage isLogin={isLogin} />}
        />
      </Switch>
    </div>
  );
}

App.propTypes = {};
export default withRouter(App);
