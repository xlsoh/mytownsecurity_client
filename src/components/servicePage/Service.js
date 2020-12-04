import { useEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Map from './Map';

function Service() {
  return (
    <div>
      <Map />
    </div>
  );
}
export default withRouter(Service);
