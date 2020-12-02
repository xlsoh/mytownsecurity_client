import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Modal } from '../../styles/Modal';

const Container = styled.div`
  display: flex;
`;
const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #4cd59e;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;
function ServHeader() {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Button onClick={() => history.push(`/mypage/:userId`)}>
          마이페이지
        </Button>
        <Button onClick={() => history.push(`/`)}>로고</Button>
        <Button onClick={openModal}>로그인</Button>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </Container>
    </>
  );
}

export default withRouter(ServHeader);
