import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

import LoginInput from '../user/loginInput';
import LoginButton from '../user/loginButton';
import useInput from '../../../hooks/useInput';

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
    signin(email: $email, password: $password)
  }
`;

const TOKENLOGIN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

function Login() {
  const idInput = useInput('');
  const passInput = useInput('');
  const [loginMutation, { loading }] = useMutation(SIGNIN, {
    variables: { email: idInput.value, password: passInput.value },
  });
  const [tokenLoginMutation] = useMutation(TOKENLOGIN);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (idInput.value !== '' && passInput.value !== '') {
      try {
        const {
          data: { signin: token },
        } = await loginMutation();
        if (token !== '' || token !== undefined) {
          tokenLoginMutation({ variables: { token } });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return '로그인 중입니다. 잠시만 기다려주세요.';
  }
  return (
    <Wrapper>
      <Container>
        <form onSubmit={onSubmit}>
          <LoginInput
            placeholder={'  Enter your Email'}
            {...idInput}
          ></LoginInput>
          <LoginInput
            placeholder={'  Enter your Password'}
            {...passInput}
            type={'password'}
          ></LoginInput>
          <LoginButton text='Log in'></LoginButton>
        </form>
        <div>
          안전궁금해의 회원이 아니신가요?
          <Link to={`/user/signup`}>지금 가입하세요</Link>!
        </div>
      </Container>
    </Wrapper>
  );
}

export default withRouter(Login);
