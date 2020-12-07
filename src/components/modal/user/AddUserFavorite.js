import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
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
  mutation AddFavorite($userId: Int!, $addressId: Int!, $aliaseInput: String!) {
    Addfavorite(
      userId: $userId
      addressId: $addressId
      aliaseInput: $aliaseInput
    ) {
      userId
      addressId
      aliaseInput
    }
  }
`;

function AddUserFavorite() {
  const [userId, addressId] = useState(0); //수정필요
  const [address] = useState(''); //수정필요
  const [aliaseInput, setAliaseInput] = useState('');
  const [addFavorite, { error }] = useMutation(ADDFAVORITE, {
    variables: {
      userId,
      addressId,
      aliaseInput,
    },
  });
  //refetchQuery
  return (
    <>
      <div>
        <a>검색하신 주소를 등록하시겠습니까?</a>
        <br />
        <br />
        <a>{address}/검색한 주소가 나타나게될 곳/</a>
        <br />

        <a>장소 별칭</a>
        <FavoriteInput
          placeholder='별칭을 입력 해주세요.'
          onChange={(e) => setAliaseInput(e.target.value)}
        />
        <br />
        <FavoriteButton
          onClick={() => {
            {
              addFavorite({
                variables: {
                  userId: userId,
                  addressId: addressId,
                  aliaseInput: aliaseInput,
                },
              });
            }
          }}
        >
          찜하기
        </FavoriteButton>
      </div>
    </>
  );
}

export default withRouter(AddUserFavorite);
