import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Main from './mainPage/Main';
import Service from './servicePage/Service';
import MyPage from './myPage/MyPage';

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
        <Route path={`/`} render={() => <Redirect to={`/main`} />} />
      </Switch>
    </div>
  );
}

App.propTypes = {};
export default withRouter(App);
