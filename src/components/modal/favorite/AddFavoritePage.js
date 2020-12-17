import React from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

import useInput from '../../../hooks/useInput';

const FavoriteButton = styled.button`
  display: relative;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
`;
const FavoriteInput = styled.input`
  margin: 10px;
  border: solid 1px #dadada;
  margin-bottom: 15px;
  padding: 10px;
`;

const ADDFAVORITE = gql`
  mutation addFavorite($userId: ID!, $addressId: ID!, $aliasInput: String!) {
    addFavorite(userId: $userId, addressId: $addressId, aliasInput: $aliasInput)
  }
`;

function AddFavoritePage({ userInfo, address }) {
  const aliaseInput = useInput('');
  const [addFavoriteMutation] = useMutation(ADDFAVORITE, {
    variables: {
      userId: userInfo.id,
      addressId: address.id,
      aliasInput: aliaseInput.value,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (aliaseInput.value == '') {
        alert('별칭을 입력해 주세요.');
      } else {
        const { data: addFavortie } = await addFavoriteMutation();
        if (addFavortie) {
          alert('찜이 완료되었습니다.');
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <a>검색하신 주소를 등록하시겠습니까?</a>
        <br />
        <br />
        <a>{address.detail}</a>
        <br />
        <a>장소 별칭</a>
        <form onSubmit={onSubmit}>
          <FavoriteInput placeholder='별칭을 입력 해주세요.' {...aliaseInput} />
          <br />
          <FavoriteButton>찜하기</FavoriteButton>
        </form>
      </div>
    </>
  );
}

export default withRouter(AddFavoritePage);
