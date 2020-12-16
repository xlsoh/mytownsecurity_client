import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ServHeader from './ServHeader';
import AddFavorite from './AddFavorite';
import CrimeRate from './CrimeRate';
import Map from './Map';
import Review from './Review';
import SearchInput from '../search/SearchInput';

/*쿼리 수정필요 */
//useQuery
const GET_SEARCHEDLOCATION = gql`
  query getSearchedLocation($addressId: Int!) {
    getSearchedLocation(addressId: $addressId)
  }
`;
// PoliceStation 불러오기.
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

function getStation() {
  const { loading, error, data } = useQuery(GET_STATION);
  let arrOfStation = Object.values(data.getStation);
  return arrOfStation;
}

function Service({ isToken, setIsToken, addressId, userInfo, setUserInfo }) {
  //서버 따라 수정 필요
  //지우기
  const loading = true,
    data = {
      address: { longitudeY: 37.5137912, latitudeX: 127.0293161 },
      crime: '',
    };

  const policeStations = getStation();
  // const { data, loading, error } = useQuery(GET_SEARCHEDLOCATION, {
  //   skip: !data,
  //   variables: { addressId },
  // });

  //서버 따라 수정 필요
  // useEffect(() => {
  //   if (!loading && data && data.address && data.crime) {
  //     console.log(data.address, data.crime);
  //   }
  // }, [loading, data]);

  return (
    <>
      <ServHeader isToken={isToken} setIsToken={setIsToken} />
      <SearchInput addressId={addressId} />
      <AddFavorite userInfo={userInfo} address={data.address} />
      <Map address={data.address} policeStations={policeStations} />
      <CrimeRate crime={data.crime} />
      <Review userInfo={userInfo} addressId={addressId} />
    </>
  );
}
export default withRouter(Service);
