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
  query getSearchedLocation($addressId: Int!) {
    getSearchedLocation(addressId: $addressId)
  }
`;

function Service({ isToken, setIsToken, addressId, userInfo, setUserInfo }) {
  //서버 따라 수정 필요
  //지우기
  const loading = true,
    data = {
      address: { longitudeY: 37.5137912, latitudeX: 127.0293161 },
      crime: '',
    };
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
      <Map address={data.address} />
      <CrimeRate crime={data.crime} />
    </>
  );
}

export default withRouter(Service);
