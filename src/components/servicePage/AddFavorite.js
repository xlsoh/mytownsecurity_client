import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import AddUserFavorite from '../modal/user/AddUserFavorite';
import { Modal } from '../../styles/Modal';

const Container = styled.div`
  display: flex;
`;
const Button = styled.button`
  min-width: 50px;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background: #ffffff;
  color: red;
  font-size: 24px;
  cursor: pointer;
`;

function AddFavorite() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Button onClick={openModal}>❤</Button>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          component={<AddUserFavorite />}
        />
      </Container>
    </>
  );
}

export default withRouter(AddFavorite);
