import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import AddFavoritePage from '../modal/favorite/AddFavoritePage';
import Modal from '../../styles/Modal';

const Container = styled.div`
  position: relative;
  left: 30px;
  top: 80px;
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
                swal('로그인 후 이용해 주세요.', {
                  button: false,
                  timer: 1000,
                  icon: 'warning',
                });
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
