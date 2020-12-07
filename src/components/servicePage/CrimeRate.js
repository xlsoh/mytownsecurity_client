import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';

/*쿼리 수정필요 */
//useQuery
const GET_CRIMERATE = gql`
  query GetCrimeRate($addressId: Int!) {
    crime(addressId: $addressId) {
      addressId
    }
  }
`;

function CrimeRate() {
  const { addressId } = useState(0);
  const { loading, error, data } = useQuery(GET_CRIMERATE, {
    variables: { addressId },
  });
  console.log(loading);
  console.log(error);
  console.log(data);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <h2>
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
        </h2>
      )}
    </>
  );
}

export default withRouter(CrimeRate);
