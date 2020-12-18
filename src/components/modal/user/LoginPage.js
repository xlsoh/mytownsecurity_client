import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import '../../../styles/Alert.css';

import LoginInput from './loginInput';
import useInput from '../../../hooks/useInput';

import Button from '@material-ui/core/Button';
import { useStylesBtn } from '../../../styles/globalBtnCss';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SIGNIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;
const TOKENLOGIN = gql`
  mutation logUserIn($token: String!, $state: Object!) {
    logUserIn(token: $token, state: $state) @client
  }
`;

function LoginPage({ setIsToken, setUserInfo }) {
  const emailInput = useInput('');
  const passInput = useInput('');
  const [loginMutation, { loading }] = useMutation(SIGNIN, {
    variables: { email: emailInput.value, password: passInput.value },
  });
  const [tokenLoginMutation] = useMutation(TOKENLOGIN);
  const loginClass = useStylesBtn();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (emailInput.value == '' || passInput.value == '') {
      swal('이메일과 비밀번호를 입력해 주세요.', {
        button: false,
        timer: 1000,
        icon: 'info',
      });
    } else {
      try {
        const {
          data: {
            signin: {
              token,
              user: { id, email },
            },
          },
        } = await loginMutation();
        if (token !== '' || token !== undefined) {
          const getUser = {
            id: id,
            email: email,
          };
          tokenLoginMutation({
            variables: {
              token: token,
              state: getUser,
            },
          });
          setIsToken(true);
          setUserInfo(getUser);
          swal({
            button: false,
            icon: 'success',
          });
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        }
      } catch (error) {
        swal('이메일과 비밀번호를 확인해 주세요.', {
          button: false,
          timer: 1000,
          icon: 'info',
        });
      }
    }
  };

  return (
    <>
      {loading && (
        <>
          <Wrapper>
            <Container>
              <div>
                <form onSubmit={onSubmit}>
                  <LoginInput
                    placeholder={'  이메일을 입력 해주세요.'}
                    {...emailInput}
                  ></LoginInput>
                  <LoginInput
                    placeholder={'  비밀번호를 입력 해주세요.'}
                    {...passInput}
                    type={'password'}
                  ></LoginInput>
                  <Button type='submit' className={loginClass.modalBtn}>
                    로그인
                  </Button>
                </form>
              </div>
              <div>
                안전궁금해의 회원이 아니신가요?
                <Link to={`/user/signup`}>지금 가입하세요</Link>!
              </div>
            </Container>
          </Wrapper>
        </>
      )}
      {!loading && (
        <>
          {' '}
          <Wrapper>
            <Container>
              <div>
                <form onSubmit={onSubmit}>
                  <LoginInput
                    placeholder={'  이메일을 입력 해주세요.'}
                    {...emailInput}
                  ></LoginInput>
                  <LoginInput
                    placeholder={'  비밀번호를 입력 해주세요.'}
                    {...passInput}
                    type={'password'}
                  ></LoginInput>
                  <Button type='submit' className={loginClass.modalBtn}>
                    로그인
                  </Button>
                </form>
              </div>
              <div>
                안전궁금해의 회원이 아니신가요?
                <Link to={`/user/signup`}>지금 가입하세요</Link>!
              </div>
            </Container>
          </Wrapper>
        </>
      )}
    </>
  );
}

export default withRouter(LoginPage);
