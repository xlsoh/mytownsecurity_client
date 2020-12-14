import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

import Modal from '../../styles/Modal';
import LoginPage from '../modal/user/LoginPage';

const Container = styled.div`
  display: flex;
`;
const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border: none;
  border-radius: 4px;
  background: #4cd59e;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
`;
const TOKENLOGOUT = gql`
  mutation logUserOut($token: String!) {
    logUserOut(token: $token) @client
  }
`;

function MainHeader({
  isToken,
  setIsToken,
  userInfo,
  setUserInfo,
  setUserContent,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [tokenLogoutMutation] = useMutation(TOKENLOGOUT, {
    variables: { token },
  });

  return (
    <>
      {isToken && (
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
          </Container>
        </>
      )}
      {!isToken && (
        <>
          <Container>
            <Button onClick={() => history.push(`/`)}>로고</Button>
            <Button
              text='Log in'
              onClick={() => {
                setIsOpen(true);
              }}
            >
              로그인
            </Button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
              <LoginPage
                setIsToken={setIsToken}
                setUserInfo={setUserInfo}
                setUserContent={setUserContent}
              />
            </Modal>
          </Container>
        </>
      )}
    </>
  );
}

export default withRouter(MainHeader);
