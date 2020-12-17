import React from 'react';
import ReviewList from './ReviewList';
import ReviewCreate from './ReviewCreate';
import { ReviewProvider } from './ReviewContext';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';

const ReviewTemplate = styled.div`
  width: 512px;
  height: 768px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const GET_REVIEWS = gql`
  query getReviews($addressId: ID!) {
    getReviews(addressId: $addressId) {
      review {
        id
        text
        rating
      }
    }
  }
`;

function Review({ userInfo, addressId }) {
  console.log(addressId);
  console.log(typeof addressId);
  // 서버 통신에 맞춰 수정 필요!
  if (addressId) {
    const { data, loading, error } = useQuery(GET_REVIEWS, {
      variables: {
        addressId: addressId,
      },
    });
    if (loading) {
      return <div>...loading</div>;
    }
    if (error) return `Error! ${error.message}`;
    console.log(data);

    return (
      <>
        {data && data.getReviews && (
          <>
            <ReviewProvider addressData={data}>
              <ReviewTemplate>
                <ReviewCreate />
                <ReviewList userInfo={userInfo} addressId={addressId} />
              </ReviewTemplate>
            </ReviewProvider>
          </>
        )}
        {data && !data.getReviews && (
          <>
            <div>등록된 리뷰가 없습니다.</div>
          </>
        )}
      </>
    );
  }
}

export default Review;
