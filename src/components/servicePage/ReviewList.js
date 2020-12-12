import React from 'react';
import ReviewListEntry from './ReviewListEntry';
import styled from 'styled-components';
import { useReviewState } from './ReviewContext';
import ReviewScore from './ReviewScore';

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
      <ReviewScore />
      {reviews.map((reviews) => (
        <ReviewListEntry
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
