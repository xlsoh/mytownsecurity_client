import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

import Modal from '../../styles/Modal';
import LoginPage from '../modal/user/LoginPage';
import Button from '@material-ui/core/Button';
import { HomeButton, useStylesHeader, Container } from './HeaderCss.js';

const TOKENLOGOUT = gql`
  mutation logUserOut($token: String!, $state: Object!) {
    logUserOut(token: $token, state: $state) @client
  }
`;

function MainHeader({ isToken, setIsToken, userInfo, setUserInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem('token');
  const state = JSON.parse(localStorage.getItem('state'));
  const [tokenLogoutMutation] = useMutation(TOKENLOGOUT, {
    variables: { token, state },
  });

  const headersBtn = useStylesHeader();
  return (
    <>
      {isToken ? (
        <>
          <Container>
            {/* <button
              
              type='button'
              onClick={() => history.push(`/`)}
            >
              <img src='https://ifh.cc/g/uCRQxb.png' />
            </button> */}
            <HomeButton onClick={() => history.push(`/`)} />

            <Button
              className={[headersBtn.header, headersBtn.login].join(' ')}
              variant='outlined'
              text='Log out'
              onClick={() =>
                tokenLogoutMutation({ variables: { token, state } })
              }
            >
              로그아웃
            </Button>
            <Button
              className={[headersBtn.header, headersBtn.mypage].join(' ')}
              variant='outlined'
              onClick={() => history.push(`/mypage/${userInfo.id}`)}
            >
              마이페이지
            </Button>
          </Container>
        </>
      ) : (
        <>
          <Container>
            <HomeButton onClick={() => history.push(`/`)} />
            <Button
              className={[headersBtn.header, headersBtn.login].join(' ')}
              text='Log in'
              variant='outlined'
              onClick={() => {
                setIsOpen(true);
              }}
            >
              로그인
            </Button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
              <LoginPage setIsToken={setIsToken} setUserInfo={setUserInfo} />
            </Modal>
          </Container>
        </>
      )}
    </>
  );
}

export default withRouter(MainHeader);
