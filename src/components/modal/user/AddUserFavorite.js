import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

const Button = styled.button`
  min-width: 30px;
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  background: #4cd59e;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: white;
  border: none;
  border-radius: 3px;
  width: 350px;
  height: 40px;
  opacity: 1;
  font-size: 16px;
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
      <h2>검색하신 주소를 등록하시겠습니까?</h2>
      <br />
      <br />
      <h3>{address}/검색한 주소가 나타나게될 곳/</h3>
      <br />

      <a>장소 별칭</a>
      <Input
        placeholder='별칭을 입력 해주세요.'
        onChange={(e) => setAliaseInput(e.target.value)}
      />
      <br />
      <Button
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
      </Button>
    </>
  );
}

export default withRouter(AddUserFavorite);
