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

const EDIT_MYFAVORITE = gql`
  mutation EditMyFavorite(
    $userId: Int!
    $favoriteId: Int!
    $placeAlias: String!
  ) {
    editMyFavorite(
      userId: $userId
      favoriteId: $favoriteId
      placeAlias: $placeAlias
    ) {
      userId
      favoriteId
      placeAlias
    }
  }
`;

function MyFavoriteListEntry({
  favoriteId,
  addressDetail,
  placeAlias,
  createdAt,
  updatedAt,
}) {
  const token = localStorage.getItem('token');
  const { userId } = useState(0);
  const [newPlaceAlias, setNewPlaceAlias] = useState('');
  const [editMyFavorite, { data, loading, error }] = useMutation(
    EDIT_MYFAVORITE,
    {
      variables: { userId, favoriteId, placeAlias },
    }
  );

  return (
    <>
      {token && (
        <>
          <p>주소</p>
          {addressDetail`주소가 생길 곳`}
          <p>별칭</p>
          {placeAlias`별칭이 생길 곳`}
          <p>생성일</p>
          {createdAt`생성일이 생길 곳`}
          <p>수정일</p>
          {updatedAt`수정일이 생길 곳`}
          <Input
            type='placeAlias'
            value={`${placeAlias}`}
            onChange={(e) => setNewPlaceAlias(e.target.value)}
          />
          <Button
            onClick={() => {
              editMyFavorite({
                variables: {
                  userId: userId,
                  favoriteId: favoriteId,
                  placeAlias: newPlaceAlias,
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

export default withRouter(MyFavoriteListEntry);
