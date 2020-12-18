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
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const GET_REVIEWS = gql`
  query getReviews($addressId: ID!) {
    getReviews(addressId: $addressId) {
      review {
        id
        text
        rating
        postedBy {
          id
        }
      }
    }
  }
`;
function Review({ userInfo, addressId }) {
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
    const assortedReview = [];
    for (let i = 0; i < data.getReviews.length; i++) {
      for (let j = 0; j < data.getReviews[i].review.length; j++) {
        assortedReview.push(data.getReviews[i].review[j]);
      }
    }
    return (
      <>
        {assortedReview.length !== 0 && (
          <ReviewProvider addressData={assortedReview}>
            <ReviewTemplate>
              <ReviewCreate userInfo={userInfo} addressId={addressId} />
              <ReviewList
                userInfo={userInfo}
                addressId={addressId}
                reviewData={assortedReview}
              />
            </ReviewTemplate>
          </ReviewProvider>
        )}
        {assortedReview.length === 0 && (
          <ReviewProvider addressData={assortedReview}>
            <ReviewTemplate>
              <ReviewCreate userInfo={userInfo} addressId={addressId} />
              등록된 리뷰가 없습니다.
            </ReviewTemplate>
          </ReviewProvider>
        )}
      </>
    );
  }
}
export default Review;
