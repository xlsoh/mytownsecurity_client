import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MyFavoriteListEntry from './MyFavoriteListEntry';

function MyFavoriteList({ data, id }) {
  return (
    <>
      {data &&
        data.map((favorite, index) => (
          <Fragment key={index}>
            <MyFavoriteListEntry
              id={id}
              favoriteId={favorite.id}
              addressDetail={favorite.postedAt.detail}
              aliasInput={favorite.aliasInput}
              createdAt={favorite.createdAt}
              updatedAt={favorite.updatedAt}
            />
          </Fragment>
        ))}
    </>
  );
}

export default withRouter(MyFavoriteList);
