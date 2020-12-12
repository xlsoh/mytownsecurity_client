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
  query getMyInfo($userId: Int!) {
    cd
    getMyInfo(userId: $userId)
  }
`;

function MyPage() {
  const token = localStorage.getItem('token');
  const { userId } = useState(0);
  const { email } = useState('');
  const { data, loading, error } = useQuery(GET_MYINFO, {
    variables: {
      userId,
    },
  });
  console.log(data);
  console.log(loading);
  console.log(error);

  useEffect(() => {
    if (!loading && data && data.reviews && data.favorites) {
      console.log(data.reviews, data.favorites);
    }
  }, [loading, data]);

  return (
    <>
      {token && (
        <>
          <MyHeader />
          <br />
          <div>
            내 정보
            <hr />
            <MyInfo email={email} />
          </div>
          <div>
            <br />
            내가 찜한 동네
            <hr />
            <MyFavoriteList data={data} userId={userId} />
          </div>
          <br />
          <div>
            내가 등록한 리뷰
            <hr />
            <MyReviewList data={data} userId={userId} />
          </div>
        </>
      )}
      {!token && null}
    </>
  );
}
export default withRouter(MyPage);
