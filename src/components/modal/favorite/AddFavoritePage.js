import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../../hooks/useInput';
import styled from 'styled-components';

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

/*쿼리 수정필요 */
//useMutation
const ADDFAVORITE = gql`
  mutation addFavorite($userId: Int!, $addressId: Int!, $aliase: String!) {
    addFavorite(userId: $userId, addressId: $addressId, aliase: $aliase)
  }
`;

function AddFavoritePage() {
  const [userId, addressId] = useState(0); //수정필요
  const [address] = useState(''); //수정필요
  const aliaseInput = useInput('');
  const [addFavoriteMutation] = useMutation(ADDFAVORITE, {
    variables: {
      userId,
      addressId,
      aliase: aliaseInput.value,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (aliaseInput.value == '') {
        alert('Please Enter your aliase!😭');
      } else {
        const { data: addFavortie } = await addFavoriteMutation();
        if (addFavortie) {
          alert('The enrollment was successful!😄');
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
        <a>검색하신 주소를 등록하시겠습니까?</a>
        <br />
        <br />
        <a>{address}/검색한 주소가 나타나게될 곳/</a>
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
