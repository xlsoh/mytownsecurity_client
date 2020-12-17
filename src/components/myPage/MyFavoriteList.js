import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import MyFavoriteListEntry from './MyFavoriteListEntry';

const FavoriteWrapper = styled.div`
  width: 750px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #e1f5f1;
  margin-left: 170px;
  margin-bottom: 50px;
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
              <hr />
            </Fragment>
          ))}
      </FavoriteWrapper>
    </>
  );
}

export default withRouter(MyFavoriteList);
