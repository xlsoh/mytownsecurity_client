import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

/*쿼리 수정필요 */
//useQuery
const GET_CRIMERATE = gql`
  query getCrimeRate($addressId: Int!) {
    crime(addressId: $addressId)
  }
`;
const CrimeWrapper = styled.div`
  width: 100px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 2;
  border-radius: 10px;
`;

function CrimeRate() {
  const { addressId } = useState(0);
  const { data, loading, error } = useQuery(GET_CRIMERATE, {
    variables: { addressId },
  });
  console.log(loading);
  console.log(error);
  console.log(data);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <CrimeWrapper>
            <p>살인</p>
            {/*수정필요*/ data.murder}건
            <br />
            <br />
            <p>강도</p>
            {/*수정필요*/ data.robbery}건
            <br /> <br />
            <p>강간강제추행</p>
            {/*수정필요*/ data.rape}건
            <br /> <br />
            <p>절도</p>
            {/*수정필요*/ data.theft}건
            <br /> <br />
            <p>폭력</p>
            {/*수정필요*/ data.violence}건
          </CrimeWrapper>
        </>
      )}
    </>
  );
}

export default withRouter(CrimeRate);
