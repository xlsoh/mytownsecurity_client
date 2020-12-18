import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ServHeader from '../mainPage/Header';
import AddFavorite from './AddFavorite';
import CrimeRate from './CrimeRate';
import Review from './Review';
import SearchInput from '../search/SearchInput';
import MapIntro from './MapIntro';
import styled from 'styled-components';
import { MainCenter } from '../mainPage/MainCss';

const MiddleTemplate = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
`;

const RightTemplate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

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
    variables: { addressId },
  });

  if (loading) {
    return <div>...loading</div>;
  }
  return (
    <>
      <ServHeader
        isToken={isToken}
        setIsToken={setIsToken}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
      <MainCenter>
        <SearchInput addressId={addressId} setAddressId={setAddressId} />
      </MainCenter>
      <MiddleTemplate>
        <MapIntro
          isToken={isToken}
          address={data.getSearchedLocation.address}
          userInfo={userInfo}
        />
        <RightTemplate>
          <AddFavorite
            isToken={isToken}
            userInfo={userInfo}
            address={data.getSearchedLocation.address}
          />
          <CrimeRate crime={data.getSearchedLocation.crime} />
        </RightTemplate>
      </MiddleTemplate>
      <Review userInfo={userInfo} addressId={addressId} />
    </>
  );
}
export default withRouter(Service);
