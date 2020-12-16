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
      address
      crime
    }
  }
`;

function Service({ isToken, setIsToken, addressId, userInfo, setUserInfo }) {
  const { data, loading, error } = useQuery(GET_SEARCHEDLOCATION, {
    variables: { addressId },
  });

  const address = {
    id: 'ckir2cp2wa84y09991zez6kyb',
    detail: '서울특별시 서초구 남부순환로 2604 (양재동)',
    X: 958927.1262997636,
    Y: 1942909.9232516368,
  };
  const crime = {};
  return (
    <>
      <ServHeader
        isToken={isToken}
        setIsToken={setIsToken}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
      <SearchInput addressId={addressId} />
      <AddFavorite userInfo={userInfo} address={address} />
      <MapIntro isToken={isToken} address={address} userInfo={userInfo} />
      <CrimeRate crime={crime} />
      <Review userInfo={userInfo} addressId={addressId} />
    </>
  );
}
export default withRouter(Service);
