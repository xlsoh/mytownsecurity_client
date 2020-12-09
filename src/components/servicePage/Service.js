import { useEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ServHeader from './ServHeader';
import AddFavorite from './AddFavorite';
import CrimeRate from './CrimeRate';
import Map from './Map';
import Review from './Review';

function Service() {
  return (
    <>
      <ServHeader />
      <AddFavorite />
      <Map />
      <CrimeRate />
      <Review />
    </>
  );
}
export default withRouter(Service);
