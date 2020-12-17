import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

const FixedHeader = styled.div`
  position: fixed;
  width: 100%;
  box-shadow: rgba(24, 71, 23, 0.05) 0px 2px 5px;
  display: flex;
  background: rgba(255, 255, 255, 0.8);
  justify-content: center;
`;

const HeaderContainer = styled.div`
  min-width: 760px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0px 50px;
`;

const HomeButton = styled.button`
  background-image: url(https://ifh.cc/g/uCRQxb.png);
  border: none;
  width: 250px;
  height: 80px;
  margin-left: 30px;
  cursor: pointer;
`;

const LogOutButton = styled.button`
  background: white;
  border: none;
  transition: all 0.5s;
  cursor: pointer;
  margin-right: 30px;
  font-family: Gill Sans;
  font-size: 25px;
  font-weight: 700;
  &:hover {
    background-color: #32e0c4;
  }
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
          <FixedHeader>
            <HeaderContainer>
              <HomeButton onClick={() => history.push(`/`)} />
              <LogOutButton
                text='Log out'
                onClick={() =>
                  tokenLogoutMutation({ variables: { token, state } })
                }
              >
                Log Out
              </LogOutButton>
            </HeaderContainer>
          </FixedHeader>
        </>
      )}
      {!isToken && null}
    </>
  );
}

export default withRouter(MyHeader);
