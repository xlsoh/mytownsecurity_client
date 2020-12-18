import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';

import ReviewRating from './ReviewRating';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
`;
const Input = styled.input`
  border: solid 1px #fff;
  margin-bottom: 15px;
  padding: 10px;
`;

const EDIT_MYREVIEW = gql`
  mutation editMyReview($reviewId: ID!, $rating: Int!, $text: String!) {
    editMyReview(reviewId: $reviewId, rating: $rating, text: $text)
  }
`;

const DELETE_MYREVIEW = gql`
  mutation deleteMyReview($reviewId: ID!) {
    deleteMyReview(reviewId: $reviewId)
  }
`;

function MyReviewListEntry({
  reviewId,
  text,
  rating,
  addressDetail,
  createdAt,
  updatedAt,
}) {
  const createdAtView = createdAt.slice(0, -14);
  const updatedAtView = updatedAt.slice(0, -14);
  const [viewForm1, setViewForm1] = useState(false);
  const [viewForm2, setViewForm2] = useState(false);
  const [newRating, setNewRating] = useState(rating);
  const newTextInput = useInput(text);
  const [editMyReviewMutation] = useMutation(EDIT_MYREVIEW, {
    variables: {
      reviewId: reviewId,
      rating: newRating,
      text: newTextInput.value,
    },
  });
  const [deleteMyReviewMutation] = useMutation(DELETE_MYREVIEW, {
    variables: {
      reviewId: reviewId,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newTextInput.value == '') {
        swal('내용을 입력해주세요.', {
          button: false,
          timer: 1000,
          icon: 'info',
        });
      } else if (newTextInput.value == text) {
        swal('변경사항이 없습니다. 다시 입력해 주세요.', {
          button: false,
          timer: 1000,
          icon: 'info',
        });
      } else {
        const { data: editMyReview } = await editMyReviewMutation();
        if (editMyReview) {
          swal({
            button: false,
            icon: 'success',
            title: '리뷰가 수정되었습니다.',
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    editMyReviewMutation();
  }, [newRating]);

  return (
    <>
      <div>
        <p>주소</p>
        {addressDetail}
        <br />
        <p>별점</p>
        <form onSubmit={onSubmit}>
          <ReviewRating rating={rating} setNewRating={setNewRating} />
        </form>
        <br />
        <p>리뷰</p>
        {!viewForm2 && (
          <>
            {text}
            <Button onClick={() => setViewForm2(true)}>수정</Button>
          </>
        )}
        <form onSubmit={onSubmit}>
          {viewForm2 && (
            <>
              <Input type='text' {...newTextInput} />
              <Button>수정</Button>
            </>
          )}
        </form>
        <p>생성일</p>
        {createdAtView}
        <p>수정일</p>
        {updatedAtView}
        <Button
          onClick={() => {
            deleteMyReviewMutation();
            swal({
              button: false,
              icon: 'success',
              title: '리뷰가 삭제되었습니다.',
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          }}
        >
          삭제
        </Button>
      </div>
    </>
  );
}

export default withRouter(MyReviewListEntry);
