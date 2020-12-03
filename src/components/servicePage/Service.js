import React, { useState } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import ServHeader from './ServHeader';

function Service() {
  return (
    <>
      <ServHeader />
    </>
  );
}

export default withRouter(Service);
