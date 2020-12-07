import React from 'react';
import { withRouter } from 'react-router-dom';

import MyHeader from './MyHeader';

function MyPage() {
  return (
    <>
      <MyHeader />
    </>
  );
}
export default withRouter(MyPage);
