import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';

import ServHeader from './ServHeader';
import AddFavorite from './AddFavorite';
import CrimeRate from './CrimeRate';
import Map from './Map';

const GET_SEARCHEDLOCATION = gql`
  query getSearchedLocation($addressId: Int!) {
    getSearchedLocation(addressId: $addressId) {
      address
      crime
    }
  }
`;

function Service({
  isToken,
  setIsToken,
  addressId,
  userInfo,
  setUserInfo,
  userContent,
  setUserContent,
}) {
  // const loading = true,
  //   data = {
  //     address: { longitudeY: 37.5137912, latitudeX: 127.0293161 },
  //     crime: '',
  //   };

  const { data, loading, error } = useQuery(GET_SEARCHEDLOCATION, {
    //skip: !data,
    variables: { addressId },
  });

  // useEffect(() => {
  //   if (!loading && data && data.address && data.crime) {
  //     console.log(data.address, data.crime);
  //   }
  // }, [loading, data]);

  return (
    <>
      {loading && '로딩 중입니다. 잠시만 기다려주세요.'}
      {!loading && (
        <>
          <ServHeader
            isToken={isToken}
            setIsToken={setIsToken}
            setUserInfo={setUserInfo}
            setUserContent={setUserContent}
          />
          <AddFavorite
            userInfo={userInfo}
            address={data /*.getSearchedLocation.address*/}
          />
          <Map
            address={data /*.getSearchedLocation.address*/}
            userContent={userContent}
          />
          <CrimeRate crime={data /*.getSearchedLocation.crime*/} />
        </>
      )}
    </>
  );
}

export default withRouter(Service);
