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
  border-radius: 10px;
`;

function MyFavoriteList({ data, id }) {
  return (
    <>
      <FavoriteWrapper>
        {data &&
          data.map((favorite, index) => (
            <Fragment key={index}>
              <br />
              <MyFavoriteListEntry
                id={id}
                favoriteId={favorite.id}
                addressDetail={favorite.postedAt.detail}
                aliasInput={favorite.aliasInput}
                createdAt={favorite.createdAt}
                updatedAt={favorite.updatedAt}
              />
              <br />
              <hr />
            </Fragment>
          ))}
      </FavoriteWrapper>
    </>
  );
}

export default withRouter(MyFavoriteList);
