import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

import { Modal } from '../../styles/Modal';
import Login from '../modal/user/Login';

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
const TOKENLOGOUT = gql`
  mutation logUserOut($token: String!) {
    logUserOut(token: $token) @client
  }
`;

function ServHeader() {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [tokenLogoutMutation] = useMutation(TOKENLOGOUT, {
    variables: { token },
  });
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  if (token) {
    return (
      <>
        <Container>
          <Button onClick={() => history.push(`/mypage/:userId`)}>
            마이페이지
          </Button>
          <Button onClick={() => history.push(`/`)}>로고</Button>
          <Button
            text='Log out'
            onClick={() => tokenLogoutMutation({ variables: { token } })}
          >
            로그아웃
          </Button>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            component={<Login />}
          />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <Button onClick={() => history.push(`/`)}>로고</Button>
          <Button onClick={openModal}>로그인</Button>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            component={<Login />}
          />
        </Container>
      </>
    );
  }
}

export default withRouter(ServHeader);
