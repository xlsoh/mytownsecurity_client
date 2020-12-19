import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import Button from '@material-ui/core/Button';
import { useStylesHeader } from '../mainPage/HeaderCss';

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
  padding: 0px 0px;
`;

const HmoeButtonWrapper = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  width: 250px;
  height: 70px;
`;

const HomeButton = styled.img.attrs({
  src: 'https://ifh.cc/g/RisaJs.png',
})`
  width: 100%;
  height: 100%;
`;

const TOKENLOGOUT = gql`
  mutation logUserOut($token: String!, $state: Object!, $addressId: Int!) {
    logUserOut(token: $token, state: $state, addressId: $addressId) @client
  }
`;

function MyHeader({ isToken }) {
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
      {isToken && (
        // <FixedHeader>
        <HeaderContainer>
          <HmoeButtonWrapper>
            <Link to={`/main`}>
              <HomeButton />
            </Link>
          </HmoeButtonWrapper>
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
        </HeaderContainer>
        // </FixedHeader>
      )}
      {!isToken && null}
    </>
  );
}

export default withRouter(MyHeader);
