import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

const MyFavoriteListContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
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
  margin-bottom: 15px;
  width: 550px;
  margin-right: 15px;
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
  favoriteId,
  addressDetail,
  aliasInput,
  createdAt,
  updatedAt,
}) {
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
        alert('새로운 별칭을 입력해주세요.');
      } else if (aliasInput == newPlaceAliasInput.value) {
        alert('변경사항이 없습니다. 다시 입력해 주세요.');
      } else {
        const { data: editMyFavorite } = await editMyFavoriteMutation();
        if (editMyFavorite) {
          alert('찜이 수정되었습니다.');
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <MyFavoriteListContainer>
        <SubTitle>주소: </SubTitle>
        <Description>{addressDetail}</Description>
        <br /> <br />
        {!viewForm && (
          <>
            <SubTitle>별칭: </SubTitle>
            <Description>{aliasInput}</Description>
            <br />
            <br />
            <SubTitle>등록한 날짜: </SubTitle>
            <Description>{updatedAt}</Description>
            <br />
            <ButtonWrapper>
              <EditDeleteButton
                onClick={() => {
                  setViewForm(true);
                }}
              >
                수정
              </EditDeleteButton>
              <EditDeleteButton
                onClick={() => {
                  deleteMyFavoriteMutation();
                  window.location.reload();
                }}
              >
                삭제
              </EditDeleteButton>
            </ButtonWrapper>
          </>
        )}
        <form onSubmit={onSubmit}>
          {viewForm && (
            <>
              <Input type='aliasInput' {...newPlaceAliasInput} />
              <EditDeleteButton>수정</EditDeleteButton>
            </>
          )}
        </form>
      </MyFavoriteListContainer>
    </>
  );
}

export default withRouter(MyFavoriteListEntry);
