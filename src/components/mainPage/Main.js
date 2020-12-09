import React from 'react';
import { withRouter } from 'react-router-dom';

import MainHeader from './MainHeader';

function Main() {
  return (
    <>
      <MainHeader />
    </>
  );
}
export default withRouter(Main);
