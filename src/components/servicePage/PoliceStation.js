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

function PoliceStation({ address, favorites, reviews }) {
  const { loading, error, data } = useQuery(GET_STATION);
  return (
    <>
      {loading && '로딩중입니다.'}
      {!loading && (
        <>
          <Map
            policeStations={data.getStation}
            address={address}
            favorites={favorites}
            reviews={reviews}
          />
        </>
      )}
    </>
  );
}

export default withRouter(PoliceStation);
