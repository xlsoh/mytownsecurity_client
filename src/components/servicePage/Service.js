import React, { useEffect } from 'react';
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
import { MiddleTemplate, RightTemplate } from './ServiceCss';


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
  searchedAddress,
  setSearchedAddress,
}) {
  const { data, loading, error } = useQuery(GET_SEARCHEDLOCATION, {
    variables: { addressId },
  });
  useEffect(() => {});

  if (loading) {
    return <></>;
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
        <SearchInput
          addressId={addressId}
          setAddressId={setAddressId}
          searchedAddress={searchedAddress}
          setSearchedAddress={setSearchedAddress}
        />
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
      {window.scrollTo(0, 0)}
    </>
  );
}
export default withRouter(Service);
