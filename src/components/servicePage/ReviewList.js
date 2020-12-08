import React from 'react';
import ReviewItem from './ReviewItem';
import styled from 'styled-components';
import { useReviewState } from './ReviewContext';

const ReviewListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const ReviewList = () => {
  const reviews = useReviewState();
  return (
    <ReviewListBlock>
      {reviews.map((reviews) => (
        <ReviewItem
          id={reviews.id}
          text={reviews.text}
          done={reviews.done}
          key={reviews.id}
        />
      ))}
    </ReviewListBlock>
  );
};
export default ReviewList;
