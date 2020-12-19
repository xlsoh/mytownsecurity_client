import React from 'react';
import styled, { css } from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { useReviewDispatch } from './ReviewContext';
import StarRatings from 'react-star-ratings';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0d7377;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #0d7377;
  }
  display: none;
`;

const ReviewItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: solid 1px;
  border-color: #0d7377;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
`;

const DELETE_MYREVIEW = gql`
  mutation deleteMyReview($reviewId: ID!) {
    deleteMyReview(reviewId: $reviewId)
  }
`;

function ReviewListEntry({
  id,
  done,
  text,
  rating,
  userInfo,
  addressId,
  reviewData,
}) {
  const dispatch = useReviewDispatch();
  const [deleteMyReviewMutation] = useMutation(DELETE_MYREVIEW, {
    variables: {
      reviewId: id,
    },
  });

  const onRemove = () => {
    dispatch({
      type: 'REMOVE',
      id,
    });
    deleteMyReviewMutation();
  };

  return (
    <ReviewItemBlock>
      <Text done={done}>{text}</Text>
      <StarRatings
        rating={rating}
        starRatedColor='red'
        numberOfStars={5}
        name='rating'
        starDimension='25px'
        starSpacing='2.5px'
      />
      <Remove onClick={onRemove}>
        {userInfo.id === reviewData && <MdDelete />}
      </Remove>
    </ReviewItemBlock>
  );
}

export default React.memo(ReviewListEntry);
