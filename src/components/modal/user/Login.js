import React from 'react';
import styled from 'styled-components';
import LoginInput from '../user/loginInput';
import LoginButton from '../user/loginButton';
import useInput from '../../../hooks/useInput';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

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

export default () => {
  const idInput = useInput('');
  const passInput = useInput('');
  const [loginMutation] = useMutation(SIGNIN, {
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
      </Container>
    </Wrapper>
  );
};
