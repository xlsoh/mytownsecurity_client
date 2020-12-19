import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import useInput from '../../hooks/useInput';
import {
  FRWrapper,
  FRTextWrapper,
  FRTextWrap,
  FRSubTitle,
  FRDesc,
  EditDeleteBtttonWrapper,
  EditDeleteBtttonWrap,
  EditDeleteButton,
  EditInput,
} from './myPageCss';

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
    <FRWrapper>
      <FRTextWrapper>
        <FRTextWrap>
          <FRSubTitle>주소: </FRSubTitle>
          <FRDesc>{addressDetail}</FRDesc>
        </FRTextWrap>
        <FRTextWrap>
          <FRSubTitle>별칭: </FRSubTitle>
          <FRDesc>{aliasInput}</FRDesc>
        </FRTextWrap>
        <FRSubTitle>등록한 날짜: </FRSubTitle>
        <FRDesc>{updatedAtView}</FRDesc>
      </FRTextWrapper>
      {!viewForm && (
        <EditDeleteBtttonWrapper>
          <EditDeleteBtttonWrap>
            <EditDeleteButton
              onClick={() => {
                setViewForm(true);
              }}
            >
              수정
            </EditDeleteButton>
          </EditDeleteBtttonWrap>
          <EditDeleteBtttonWrap>
            <EditDeleteButton
              onClick={() => {
                deleteMyFavoriteMutation();
                window.location.reload();
              }}
            >
              삭제
            </EditDeleteButton>
          </EditDeleteBtttonWrap>
        </EditDeleteBtttonWrapper>
      )}
      <form onSubmit={onSubmit}>
        {viewForm && (
          <>
            <EditInput type='aliasInput' {...newPlaceAliasInput} />
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

export default withRouter(MyFavoriteListEntry);
