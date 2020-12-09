import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
`;
const Input = styled.input`
  border: solid 1px #dadada;
  margin-bottom: 15px;
  padding: 10px;
`;

const EDIT_MYREVIEW = gql`
  mutation editMyReview(
    $userId: Int!
    $reviewId: Int!
    $grade: Int
    $text: String
  ) {
    editMyReview(
      userId: $userId
      reviewId: $reviewId
      grade: $grade
      text: $text
    )
  }
`;

function MyReviewListEntry({
  reviewId,
  text,
  grade,
  addressDetail,
  createdAt,
  updatedAt,
}) {
  const { userId } = useState(0);
  const newGradeInput = useInput('');
  const newTextInput = useInput('');
  const [editMyReviewMutation] = useMutation(EDIT_MYREVIEW, {
    variables: {
      userId: userId,
      reviewId: reviewId,
      grade: newGradeInput.value,
      text: newTextInput.value,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newGradeInput.value == '') {
        alert('Please Enter your new Grade!😭');
      } else if (newTextInput.value == '') {
        alert('Please Enter your new Text!😭');
      } else {
        const { data: editMyReview } = await editMyReviewMutation();
        if (editMyReview) {
          alert('The modification was successful!😄');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <p>주소</p>
        {addressDetail`주소가 생길 곳`}
        <p>별점</p>
        {grade`별점이 생길 곳`}
        <p>리뷰</p>
        {text`리뷰가 생길 곳`}
        <p>생성일</p>
        {createdAt`생성일이 생길 곳`}
        <p>수정일</p>
        {updatedAt`수정일이 생길 곳`}
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <Input type='text' value={`${text}`} {...newTextInput} />
          <Input type='grade' value={`${grade}`} {...newGradeInput} />
          <Button>수정</Button>
          <Button onClick={() => {} /*서버에 맞춰 수정 필요 */}>삭제</Button>
        </form>
      </div>
    </>
  );
}

export default withRouter(MyReviewListEntry);
