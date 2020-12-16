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

const ReviewList = ({ userInfo, addressId }) => {
  const reviews = useReviewState();
  return (
    <ReviewListBlock>
      {reviews.map((reviews) => (
        <ReviewListEntry
          id={reviews.id}
          text={reviews.text}
          key={reviews.id}
          rating={reviews.rating}
          userInfo={userInfo}
          addressId={addressId}
        />
      ))}
    </ReviewListBlock>
  );
};
export default ReviewList;
