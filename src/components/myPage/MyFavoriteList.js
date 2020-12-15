import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import MyFavoriteListEntry from './MyFavoriteListEntry';

const FavoriteWrapper = styled.div`
  width: 100%;
  padding: 20px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 2;
  border-radius: 10px;
`;

function MyFavoriteList({ data, id }) {
  return (
    <>
      <FavoriteWrapper>
        {data &&
          data.favorites &&
          data.favorites.map((favorite, index) => (
            <Fragment key={index}>
              <MyFavoriteListEntry
                id={id}
                favoriteId={favorite.id}
                addressDetail={favorite.addressDetail}
                placeAlias={favorite.placeAlias}
                createdAt={favorite.createdAt}
                updatedAt={favorite.updatedAt}
              />
              <hr />
            </Fragment>
          ))}
      </FavoriteWrapper>
    </>
  );
}

export default withRouter(MyFavoriteList);
