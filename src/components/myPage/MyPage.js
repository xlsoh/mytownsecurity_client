import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';
import MyHeader from './MyHeader';
import MyInfo from './MyInfo';
import MyFavoriteList from './MyFavoriteList';
import MyReviewList from './MyReviewList';
import { MyPageTitle, MyInfoContainer, FRContainer } from './myPageCss';

const FavoritesReviewsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

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
              <MyInfoContainer>
                <MyPageTitle>나의 정보</MyPageTitle>
                <MyInfo userInfo={userInfo} />
              </MyInfoContainer>
              <FavoritesReviewsContainer>
                <FRContainer>
                  <MyPageTitle>찜한 동네</MyPageTitle>
                  <MyFavoriteList
                    data={data.getMyInfo.favorite}
                    id={userInfo.id}
                  />
                </FRContainer>
                <FRContainer>
                  <MyPageTitle>작성한 리뷰</MyPageTitle>
                  <MyReviewList data={data.getMyInfo.review} id={userInfo.id} />
                </FRContainer>
              </FavoritesReviewsContainer>
            </>
          )}
        </>
      )}
    </>
  );
}
export default withRouter(MyPage);
