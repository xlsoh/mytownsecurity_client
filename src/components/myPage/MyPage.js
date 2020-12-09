import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import MyHeader from './MyHeader';
import MyInfo from './MyInfo';
import MyFavoriteList from './MyFavoriteList';
import MyReviewList from './MyReviewList';

function MyPage() {
  const token = localStorage.getItem('token');

  return (
    <>
      {token && (
        <>
          <MyHeader />
          <div>
            내 정보
            <MyInfo />
          </div>
          <div>
            내가 찜한 동네
            <MyFavoriteList />
          </div>
          <div>
            내가 등록한 리뷰
            <MyReviewList />
          </div>
        </>
      )}
      {!token && null}
    </>
  );
}
export default withRouter(MyPage);
