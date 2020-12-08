import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
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
  mutation EditMyReview(
    $userId: Int!
    $reviewId: Int!
    $grade: Int!
    $text: String!
  ) {
    editMyReview(
      userId: $userId
      reviewId: $reviewId
      grade: $grade
      text: $text
    ) {
      userId
      reviewId
      grade
      text
    }
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
  const token = localStorage.getItem('token');
  const { userId } = useState(0);
  const [newGrade, setNewGrade] = useState(0);
  const [newText, setNewText] = useState('');
  const [editMyReview, { data, loading, error }] = useMutation(EDIT_MYREVIEW, {
    variables: { userId, reviewId, grade, text },
  });

  return (
    <>
      {token && (
        <>
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
          <Input
            type='text'
            value={`${text}`}
            onChange={(e) => setNewText(e.target.value)}
          />
          <Button
            onClick={() => {
              editMyReview({
                variables: {
                  userId: userId,
                  reviewId: reviewId,
                  grade: grade,
                  text: text,
                },
              });
            }}
          >
            수정
          </Button>
          <Button onClick={() => {} /*서버에 맞춰 수정 필요 */}>삭제</Button>
        </>
      )}
      {!token && null}
    </>
  );
}

export default withRouter(MyReviewListEntry);
