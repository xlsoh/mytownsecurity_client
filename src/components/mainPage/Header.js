import React, { useState } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

import swal from '@sweetalert/with-react';

import Modal from '../../styles/Modal';
import LoginPage from '../modal/user/LoginPage';
import Button from '@material-ui/core/Button';
import { HomeButton, useStylesHeader, Container } from './HeaderCss.js';

const TOKENLOGOUT = gql`
  mutation logUserOut($token: String!, $state: Object!, $addressId: Int!) {
    logUserOut(token: $token, state: $state, addressId: $addressId) @client
  }
`;

function MainHeader({ isToken, setIsToken, userInfo, setUserInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem('token');
  const state = JSON.parse(localStorage.getItem('state'));
  const addressId = localStorage.getItem('addressId');
  const [tokenLogoutMutation] = useMutation(TOKENLOGOUT, {
    variables: { token, state, addressId },
  });

  const headersBtn = useStylesHeader();
  return (
    <>
      {isToken ? (
        <>
          <Container>
            <Link to={`/main`}>
              <HomeButton />
            </Link>

            <Button
              className={[headersBtn.header, headersBtn.login].join(' ')}
              variant='outlined'
              text='Log out'
              onClick={() => {
                swal({
                  button: false,
                  icon: 'success',
                });
                setTimeout(() => {
                  tokenLogoutMutation({
                    variables: { token, state, addressId },
                  });
                }, 1300);
              }}
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
            <Link to={`/main`}>
              <HomeButton />
            </Link>

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
