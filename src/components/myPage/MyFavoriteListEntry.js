import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';

import useInput from '../../hooks/useInput';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 10px;
  cursor: pointer;
`;
const Input = styled.input`
  border: solid 1px #fff;
  margin-bottom: 15px;
  padding: 10px;
`;

const EDIT_MYFAVORITE = gql`
  mutation editMyFavorite($favoriteId: ID!, $aliasInput: String!) {
    editMyFavorite(favoriteId: $favoriteId, aliasInput: $aliasInput)
  }
`;
const DELETE_MYFAVORITE = gql`
  mutation deleteMyFavorite($favoriteId: ID!) {
    deleteMyFavorite(favoriteId: $favoriteId)
  }
`;

function MyFavoriteListEntry({
  id,
  favoriteId,
  addressDetail,
  aliasInput,
  createdAt,
  updatedAt,
}) {
  const createdAtView = createdAt.slice(0, -14);
  const updatedAtView = updatedAt.slice(0, -14);
  const [viewForm, setViewForm] = useState(false);
  const newPlaceAliasInput = useInput(aliasInput);
  const [editMyFavoriteMutation] = useMutation(EDIT_MYFAVORITE, {
    variables: {
      favoriteId: favoriteId,
      aliasInput: newPlaceAliasInput.value,
    },
  });
  const [deleteMyFavoriteMutation] = useMutation(DELETE_MYFAVORITE, {
    variables: {
      favoriteId: favoriteId,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPlaceAliasInput.value == '') {
        swal('내용을 입력해주세요.', {
          button: false,
          timer: 1000,
          icon: 'info',
        });
      } else if (aliasInput == newPlaceAliasInput.value) {
        swal('변경사항이 없습니다. 다시 입력해 주세요.', {
          button: false,
          timer: 1000,
          icon: 'info',
        });
      } else {
        const { data: editMyFavorite } = await editMyFavoriteMutation();
        if (editMyFavorite) {
          swal({
            button: false,
            icon: 'success',
            title: '찜이 수정되었습니다.',
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
  return (
    <>
      <div>
        <p>주소</p>
        {addressDetail}
        <br />
        <p>별칭</p>
        {!viewForm && (
          <>
            {aliasInput}
            <Button
              onClick={() => {
                setViewForm(true);
              }}
            >
              수정
            </Button>
          </>
        )}
        <form onSubmit={onSubmit}>
          {viewForm && (
            <>
              <Input type='aliasInput' {...newPlaceAliasInput} />
              <Button>수정</Button>
            </>
          )}
        </form>
        <Button
          onClick={() => {
            deleteMyFavoriteMutation();
            swal({
              button: false,
              icon: 'success',
              title: '찜이 삭제되었습니다.',
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          }}
        >
          삭제
        </Button>

        <p>생성일</p>
        {createdAtView}
        <p>수정일</p>
        {updatedAtView}
      </div>
    </>
  );
}

export default withRouter(MyFavoriteListEntry);
