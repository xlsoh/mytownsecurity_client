import { useEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Map from './Map';
import Review from './Review';

function Service() {
  return (
    <div>
      <Review />
    </div>
  );
}
export default withRouter(Service);
