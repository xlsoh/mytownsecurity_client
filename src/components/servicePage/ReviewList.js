import React from 'react';
import ReviewListEntry from './ReviewListEntry';
import styled from 'styled-components';
import { useReviewState } from './ReviewContext';

const ReviewListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const ReviewList = ({ userInfo, addressId, reviewData }) => {
  const reviews = useReviewState();

  return (
    <ReviewListBlock>
      {console.log(reviews)}
      {reviews.length !== 0 &&
        reviews.map((reviews) => (
          <ReviewListEntry
            id={reviews.id}
            text={reviews.text}
            key={reviews.id}
            rating={reviews.rating}
            userInfo={userInfo}
            addressId={addressId}
            reviewData={reviews.postedBy.id}
          />
        ))}
      {reviews.length === 0 && <div>등록된 리뷰가 없습니다.</div>}
    </ReviewListBlock>
  );
};
export default ReviewList;
