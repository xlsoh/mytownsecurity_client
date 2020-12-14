import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import MyHeader from './MyHeader';
import MyInfo from './MyInfo';
import MyFavoriteList from './MyFavoriteList';
import MyReviewList from './MyReviewList';

/*쿼리 수정 */
const GET_MYINFO = gql`
  query getMyInfo($email: String!) {
    getMyInfo(email: $email)
  }
`;

function MyPage({ isToken, userInfo }) {
  const { data, loading, error } = useQuery(GET_MYINFO, {
    variables: {
      userId: userInfo.email,
    },
  });

  useEffect(() => {
    if (!loading && data && data.reviews && data.favorites) {
      console.log(data.reviews, data.favorites);
    }
  }, [loading, data]);

  return (
    <>
      {isToken && (
        <>
          <MyHeader />
          <br /> <br />
          <div>
            내 정보
            <hr />
            <MyInfo userInfo={userInfo} />
          </div>
          <div>
            <br /> <br /> <br />
            내가 찜한 동네
            <hr />
            <MyFavoriteList data={data} id={userInfo.id} />
          </div>
          <br /> <br /> <br />
          <div>
            내가 등록한 리뷰
            <hr />
            <MyReviewList data={data} id={userInfo.id} />
          </div>
        </>
      )}
      {!isToken && null}
    </>
  );
}
export default withRouter(MyPage);
