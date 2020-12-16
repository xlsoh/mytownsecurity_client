import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { Route, Redirect, withRouter } from 'react-router-dom';

import ServHeader from './ServHeader';
import AddFavorite from './AddFavorite';
import CrimeRate from './CrimeRate';
import Review from './Review';
import SearchInput from '../search/SearchInput';
import MapIntro from './MapIntro';

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

function Service({
  isToken,
  setIsToken,
  addressId,
  userInfo,
  setUserInfo,
  setAddressId,
}) {
  //서버 따라 수정 필요
  const { data, loading, error } = useQuery(GET_SEARCHEDLOCATION, {
    variables: { addressId },
  });

  const loading = true,
    data = {
      address: { longitudeY: 37.5137912, latitudeX: 127.0293161 },
      crime: '',
    };

  if (loading) {
    return <div>...loading</div>;
  }

  console.log(data.getSearchedLocation.address);
  console.log(data.getSearchedLocation.crime);

  //   const address = {
  //     id: 'ckir2cp2wa84y09991zez6kyb',
  //     detail: '서울특별시 서초구 남부순환로 2604 (양재동)',
  //     X: 958927.1262997636,
  //     Y: 1942909.9232516368,
  //   };
  //   const crime = {};

  return (
    <>
      <ServHeader
        isToken={isToken}
        setIsToken={setIsToken}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
      <SearchInput addressId={addressId} setAddressId={setAddressId} />
      <AddFavorite
        userInfo={userInfo}
        address={data.getSearchedLocation.address}
      />
      <Map
        address={data.getSearchedLocation.address}
        userContent={userContent}
        policeStations={policeStations}
      />
      <CrimeRate crime={data.getSearchedLocation.crime} />
      <Review userInfo={userInfo} addressId={addressId} />
    </>
  );
}
export default withRouter(Service);
