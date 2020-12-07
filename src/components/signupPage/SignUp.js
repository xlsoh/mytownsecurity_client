import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
//import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Wrapper = styled.section`
  padding: 5em;
  border: 3px solid #4cd59e;
  border-radius: 40px;
  display: grid;
`;
const SignupButton = styled.button`
  display: relative;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
`;
const SignupInput = styled.input`
  border: solid 1px #dadada;
  margin-bottom: 15px;
  padding: 10px;
`;

/*쿼리 수정필요 */
//useMutation
const SIGNUP = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      email
      password
    }
  }
`;

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, { error }] = useMutation(SIGNUP, {
    variables: {
      email,
      password,
    },
  });
  //refetchQuery

  return (
    <>
      <Background>
        <Wrapper>
          <a>회원가입</a>
          <br />
          <a>Email</a>
          <SignupInput
            type='email'
            placeholder='이메일을 입력 해주세요.'
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <a>비밀번호</a>
          <SignupInput
            type='password'
            placeholder='비밀번호를 입력 해주세요.'
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <SignupButton
            onClick={() => {
              signUp({
                variables: {
                  email: email,
                  password: password,
                },
              });
            }}
          >
            회원가입
          </SignupButton>
        </Wrapper>
      </Background>
    </>
  );
}

export default withRouter(SignUp);
