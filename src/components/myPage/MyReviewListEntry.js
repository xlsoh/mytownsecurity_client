import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import ReviewRating from './ReviewRating';

const MyReviewListContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 50px;
`;
const ButtonWrapper = styled.div`
  display: frid;
  justify-content: end;
  margin-right: 30ox;
`;

const EditDeleteButton = styled.button`
  border: solid 1px #dadada;
  margin-right: 15px;
  margin-bottom: 8px;
  padding: 5px;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #32e0c4;
  }
`;

const SubTitle = styled.span`
  font-size: 25px;
`;

const Description = styled.span`
  opacity: 0.6;
  font-size: 20px;
  font-weight: 400;
`;

const Input = styled.input`
  border: solid 1px #fff;
  width: 550px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 10px;
`;

const RatingWrapper = styled.div`
  display: flex;
  justify-content: start;
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
        alert('내용을 입력해 주세요.');
      } else if (newTextInput.value == text) {
        alert('변경사항이 없습니다. 다시 입력해 주세요.');
      } else {
        const { data: editMyReview } = await editMyReviewMutation();
        if (editMyReview) {
          alert('리뷰가 수정되었습니다.');
          window.location.reload();
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
      <MyReviewListContainer>
        <SubTitle>주소: </SubTitle>
        <Description>{addressDetail}</Description>
        <br />
        <br />
        {!viewForm2 && (
          <>
            <SubTitle>리뷰: </SubTitle>
            <Description>{text}</Description>
            <br />
            <br />
            <RatingWrapper>
              <SubTitle>평점: </SubTitle>
              <form onSubmit={onSubmit}>
                <ReviewRating rating={rating} setNewRating={setNewRating} />
              </form>
            </RatingWrapper>
            <br />
            <SubTitle>등록한 날짜: </SubTitle>
            <Description>{updatedAt}</Description>
            <br />
            <ButtonWrapper>
              <EditDeleteButton onClick={() => setViewForm2(true)}>
                수정
              </EditDeleteButton>
              <EditDeleteButton
                onClick={() => {
                  deleteMyReviewMutation();
                  window.location.reload();
                }}
              >
                삭제
              </EditDeleteButton>
            </ButtonWrapper>
          </>
        )}
        <form onSubmit={onSubmit}>
          {viewForm2 && (
            <>
              <Input type='text' {...newTextInput} />
              <EditDeleteButton>수정</EditDeleteButton>
            </>
          )}
        </form>
      </MyReviewListContainer>
    </>
  );
}

export default withRouter(MyReviewListEntry);
