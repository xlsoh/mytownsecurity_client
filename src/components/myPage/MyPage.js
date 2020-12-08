import React from 'react';
import { withRouter } from 'react-router-dom';

import MyHeader from './MyHeader';
import MyFavoriteList from './MyFavoriteList';

function MyPage() {
  return (
    <>
      <MyHeader />
      <MyFavoriteList />
    </>
  );
}
export default withRouter(MyPage);
