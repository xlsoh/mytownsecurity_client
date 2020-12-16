import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

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
  mutation logUserOut($token: String!, $state: Object!) {
    logUserOut(token: $token, state: $state) @client
  }
`;

function MyHeader({ isToken }) {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const state = JSON.parse(localStorage.getItem('state'));
  const [tokenLogoutMutation] = useMutation(TOKENLOGOUT, {
    variables: { token, state },
  });

  return (
    <>
      {isToken && (
        <>
          <Container>
            <Button onClick={() => history.push(`/`)}>로고</Button>
            <Button
              text='Log out'
              onClick={() =>
                tokenLogoutMutation({ variables: { token, state } })
              }
            >
              로그아웃
            </Button>
          </Container>
        </>
      )}
      {!isToken && null}
    </>
  );
}

export default withRouter(MyHeader);
