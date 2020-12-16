import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import MyHeader from './MyHeader';
import MyInfo from './MyInfo';
import MyFavoriteList from './MyFavoriteList';
import MyReviewList from './MyReviewList';

const GET_MYINFO = gql`
  query getMyInfo($userId: ID!) {
    getMyInfo(userId: $userId) {
      review {
        id
        text
        rating
        createdAt
        updatedAt
        postedAt {
          detail
          X
          Y
        }
      }
      favorite {
        id
        aliasInput
        createdAt
        updatedAt
        postedAt {
          detail
          X
          Y
        }
      }
    }
  }
`;

function MyPage({ isToken, userInfo }) {
  const { data, loading, error } = useQuery(GET_MYINFO, {
    variables: {
      userId: userInfo.id,
    },
  });

  return (
    <>
      {isToken && (
        <>
          {loading && '로딩중입니다...'}
          {!loading && (
            <>
              <MyHeader isToken={isToken} />
              <br /> <br />
              <div>
                내 정보
                <hr />
                <br />
                <MyInfo userInfo={userInfo} />
              </div>
              <div>
                <br /> <br /> <br />
                내가 찜한 동네
                <hr />
                <br />
                <MyFavoriteList
                  data={data.getMyInfo.favorite}
                  id={userInfo.id}
                />
              </div>
              <br /> <br /> <br />
              <div>
                내가 등록한 리뷰
                <hr />
                <br />
                <MyReviewList data={data.getMyInfo.review} id={userInfo.id} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
export default withRouter(MyPage);
