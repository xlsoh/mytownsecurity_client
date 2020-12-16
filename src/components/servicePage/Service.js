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
  query getSearchedLocation($addressId: ID!) {
    getSearchedLocation(addressId: $addressId) {
      address {
        id
        detail
        X
        Y
      }
      crime {
        gu
        murder
        rape
        robbery
        theft
        violence
      }
    }
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


function Service({
  isToken,
  setIsToken,
  addressId,
  userInfo,
  setUserInfo,
  setAddressId,
}) {
  userContent,
  setUserContent,
}) {
  //서버 따라 수정 필요
  const { data, loading, error } = useQuery(GET_SEARCHEDLOCATION, {
    // skip: !data,
    variables: { addressId },
  });
  
  const loading = true,
    data = {
      address: { longitudeY: 37.5137912, latitudeX: 127.0293161 },
      crime: '',
    };

  const policeStations = getStation();


  if (loading) {
    return <div>...loading</div>;
  }

  console.log(data.getSearchedLocation.address);
  console.log(data.getSearchedLocation.crime);

  return (
    <>
      <ServHeader
        isToken={isToken}
        setIsToken={setIsToken}
        setUserInfo={setUserInfo}
        setUserContent={setUserContent}
      />
      <SearchInput addressId={addressId} setAddressId={setAddressId}/>
      <AddFavorite userInfo={userInfo}  address={data.getSearchedLocation.address} />
      <Map address={data.getSearchedLocation.address} userContent={userContent} policeStations={policeStations} />
      <CrimeRate crime={data.getSearchedLocation.crime} />
      <Review userInfo={userInfo} addressId={addressId} />
    </>
  );
}
export default withRouter(Service);
