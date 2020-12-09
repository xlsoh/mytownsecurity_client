import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

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

function MyHeader() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [tokenLogoutMutation] = useMutation(TOKENLOGOUT, {
    variables: { token },
  });

  return (
    <>
      {token && (
        <>
          <Container>
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
      {!token && null}
    </>
  );
}

export default withRouter(MyHeader);
