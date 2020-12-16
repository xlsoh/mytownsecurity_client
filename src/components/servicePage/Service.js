import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { Route, Redirect, withRouter } from 'react-router-dom';

import ServHeader from './ServHeader';
import AddFavorite from './AddFavorite';
import CrimeRate from './CrimeRate';
import Map from './Map';
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

function Service({
  isToken,
  setIsToken,
  addressId,
  userInfo,
  setUserInfo,
  setAddressId,
}) {
  const { data, loading, error } = useQuery(GET_SEARCHEDLOCATION, {
    // skip: !data,
    variables: { addressId },
  });

  if (loading) {
    return <div>...loading</div>;
  }

  console.log(data.getSearchedLocation.address);
  console.log(data.getSearchedLocation.crime);

  return (
    <>
      <ServHeader isToken={isToken} setIsToken={setIsToken} />
      <SearchInput addressId={addressId} setAddressId={setAddressId} />
      <AddFavorite
        userInfo={userInfo}
        address={data.getSearchedLocation.address}
      />
      <Map address={data.getSearchedLocation.address} />
      <CrimeRate crime={data.getSearchedLocation.crime} />
    </>
  );
}

export default withRouter(Service);
