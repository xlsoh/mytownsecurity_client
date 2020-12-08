import React from 'react';
import { withRouter } from 'react-router-dom';

import MyHeader from './MyHeader';
import MyFavoriteList from './MyFavoriteList';
import MyReviewList from './MyReviewList';
import MyReviewListEntry from './MyReviewListEntry';

function MyPage() {
  return (
    <>
      <div>
        내가 찜한 동네
        <MyHeader />
        <MyFavoriteList />
      </div>
      <div>
        내가 등록한 리뷰
        <MyReviewList />
        <MyReviewListEntry />
      </div>
    </>
  );
}
export default withRouter(MyPage);
