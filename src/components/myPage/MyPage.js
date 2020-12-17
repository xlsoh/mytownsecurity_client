import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import MyHeader from './MyHeader';
import MyInfo from './MyInfo';
import MyFavoriteList from './MyFavoriteList';
import MyReviewList from './MyReviewList';

const MyInfoContainer = styled.div`
  display: grid;
  place-items: center;
  margin-top: 80px;
`;

const FavoritesReviewsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FavoritesReviewsWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: 700;
  font-family: Gill Sans;
`;

const FavoriteTitle = styled.div`
  font-size: 45px;
  font-weight: 700;
  font-family: Gill Sans;
  margin-bottom: 20px;
  margin-left: 170px;
`;

const ReviewTitle = styled.div`
  font-size: 45px;
  font-weight: 700;
  font-family: Gill Sans;
  margin-bottom: 20px;
  margin-right: 150px;
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
              <br /> <br />
              <MyInfoContainer>
                <Title>나의 정보</Title>
                <br />
                <br />
                <MyInfo userInfo={userInfo} />
              </MyInfoContainer>
              <br /> <br /> <br />
              <br />
              <FavoritesReviewsContainer>
                <FavoritesReviewsWrapper>
                  <FavoriteTitle>찜한 동네</FavoriteTitle>
                  <MyFavoriteList
                    data={data.getMyInfo.favorite}
                    id={userInfo.id}
                  />
                </FavoritesReviewsWrapper>
                <FavoritesReviewsWrapper>
                  <ReviewTitle>작성한 리뷰</ReviewTitle>
                  <MyReviewList data={data.getMyInfo.review} id={userInfo.id} />
                </FavoritesReviewsWrapper>
              </FavoritesReviewsContainer>
            </>
          )}
        </>
      )}
    </>
  );
}
export default withRouter(MyPage);
