import React from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Map from './Map';

const GET_STATION = gql`
  query getStation {
    getStation {
      id
      X
      Y
      stationName
      stationAddress
    }
  }
`;

function PoliceStation(address) {
  const { loading, error, data } = useQuery(GET_STATION);

  console.log(address);

  return (
    <>
      {loading && '로딩중입니다.'}
      {!loading && (
        <>
          <Map policeStations={data.getStation} address={address} />
        </>
      )}
    </>
  );
}

export default withRouter(PoliceStation);
