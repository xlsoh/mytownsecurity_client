import React from 'react';
import ReviewList from './ReviewList';
import ReviewCreate from './ReviewCreate';
import { ReviewProvider } from './ReviewContext';
import styled from 'styled-components';

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

function Review({ userInfo, addressId }) {
  return (
    <ReviewProvider addressId={addressId}>
      <ReviewTemplate>
        <ReviewCreate />
        <ReviewList userInfo={userInfo} addressId={addressId} />
      </ReviewTemplate>
    </ReviewProvider>
  );
}

export default Review;
