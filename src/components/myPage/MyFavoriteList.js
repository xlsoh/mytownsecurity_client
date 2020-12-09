import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import MyFavoriteListEntry from './MyFavoriteListEntry';

// 쿼리 수정 필요
const GET_MYFAVORITE = gql`
  query getMyFavorite($userId: Int!) {
    getMyFavorite(userId: $userId)
  }
`;

function MyFavoriteList() {
  const { userId } = useState(0); //수정 필요
  const { data, loading, error } = useQuery(GET_MYFAVORITE, {
    variables: {
      userId,
    },
  });
  console.log(data);
  console.log(loading);
  console.log(error);

  useEffect(() => {
    if (!loading & data && data.favorite) {
      console.log(data.favorite);
    }
  }, [loading, data]);

  return (
    <>
      {data &&
        data.favorite &&
        data.favorite.map((favorite, index) => (
          <Fragment key={index}>
            <MyFavoriteListEntry
              favoriteId={favorite.id}
              addressDetail={favorite.addressDetail}
              placeAlias={favorite.placeAlias}
              createdAt={favorite.createdAt}
              updatedAt={favorite.updatedAt}
            />
            <hr />
          </Fragment>
        ))}
    </>
  );
}

export default withRouter(MyFavoriteList);
