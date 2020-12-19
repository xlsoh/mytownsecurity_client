import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import ReviewRating from './ReviewRating';
import {
  FRWrapper,
  FRTextWrapper,
  FRTextWrap,
  FRSubTitle,
  FRDesc,
  RatingWrapper,
  EditDeleteBtttonWrapper,
  EditDeleteBtttonWrap,
  EditDeleteButton,
  EditInput,
} from './myPageCss';

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
    <FRWrapper>
      <FRTextWrapper>
        <FRTextWrap>
          <FRSubTitle>주소: </FRSubTitle>
          <FRDesc>{addressDetail}</FRDesc>
        </FRTextWrap>
        <FRTextWrap>
          <FRSubTitle>리뷰: </FRSubTitle>
          <FRDesc>{text}</FRDesc>
        </FRTextWrap>
        <RatingWrapper>
          <FRSubTitle>평점: </FRSubTitle>
          <form onSubmit={onSubmit}>
            <ReviewRating rating={rating} setNewRating={setNewRating} />
          </form>
        </RatingWrapper>
        <FRSubTitle>등록한 날짜: </FRSubTitle>
        <FRDesc>{updatedAtView}</FRDesc>
      </FRTextWrapper>
      {!viewForm2 && (
        <EditDeleteBtttonWrapper>
          <EditDeleteBtttonWrap>
            <EditDeleteButton onClick={() => setViewForm2(true)}>
              수정
            </EditDeleteButton>
          </EditDeleteBtttonWrap>
          <EditDeleteBtttonWrap>
            <EditDeleteButton
              onClick={() => {
                deleteMyReviewMutation();
                window.location.reload();
              }}
            >
              삭제
            </EditDeleteButton>
          </EditDeleteBtttonWrap>
        </EditDeleteBtttonWrapper>
      )}
      <form onSubmit={onSubmit}>
        {viewForm2 && (
          <>
            <EditInput type='text' {...newTextInput} />
            <EditDeleteBtttonWrapper>
              <EditDeleteBtttonWrap>
                <EditDeleteButton>수정</EditDeleteButton>
              </EditDeleteBtttonWrap>
            </EditDeleteBtttonWrapper>
          </>
        )}
      </form>
      <hr />
    </FRWrapper>
  );
}

export default withRouter(MyReviewListEntry);
