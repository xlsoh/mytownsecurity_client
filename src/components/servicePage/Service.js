import React, { useState } from 'react';

import { Route, Redirect, withRouter } from 'react-router-dom';
import Map from './Map';

import ServHeader from './ServHeader';
import AddFavorite from './AddFavorite';
import CrimeRate from './CrimeRate';

function Service() {
  return (
    <>
      <ServHeader />
      <AddFavorite />
      <CrimeRate />
    </>
  );
}

export default withRouter(Service);
