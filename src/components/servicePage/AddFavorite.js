import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AddFavoritePage from '../modal/favorite/AddFavoritePage';
import Modal from '../../styles/Modal';

const Container = styled.span`
  position: relative;
  top: 200px;
  left: 950px;
  z-index: 2;
`;
const Button = styled.button`
  min-width: 50px;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background: #ffffff;
  color: red;
  font-size: 75px;
  cursor: pointer;
`;

function AddFavorite({ isToken, address, userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isToken && (
        <>
          <Container>
            <Button onClick={openModal}>❤</Button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
              <AddFavoritePage userInfo={userInfo} address={address} />
            </Modal>
          </Container>
        </>
      )}
      {!isToken && (
        <>
          <Container>
            <Button
              onClick={() => {
                alert('로그인 후 이용해 주세요.');
              }}
            >
              ❤
            </Button>
          </Container>
        </>
      )}
    </>
  );
}

export default withRouter(AddFavorite);
