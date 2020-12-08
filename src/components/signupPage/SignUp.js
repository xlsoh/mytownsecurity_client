import React from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
//import { gql, useMutation } from '@apollo/client';

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
  padding: 6em;
  border: 3px solid #4cd59e;
  border-radius: 40px;
  display: grid;
`;
const SignupButton = styled.button`
  min-width: 30px;
  padding: 6px;
  border-radius: 10px;
  border: none;
  background: #4cd59e;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;
const SignupInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: none;
  border: none;
  border-radius: 6px;
  width: 280px;
  height: 50px;
  opacity: 1;
  font-size: 18px;
`;

/*쿼리 수정필요 */
//useMutation
const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

function SignUp() {
  const history = useHistory();
  const idInput = useInput('');
  const passInput = useInput('');
  const passConfirmInput = useInput('');
  const [signUpMutation] = useMutation(SIGNUP, {
    variables: {
      email: idInput.value,
      password: passInput.value,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        idInput.value !== '' &&
        passInput.value !== '' &&
        passConfirmInput.value !== ''
      ) {
        if (passInput.value !== passConfirmInput.value) {
          alert('Please Check Password');
        } else {
          const { data: signup } = await signUpMutation();
          if (signup) {
            alert('Welocom to myTownSecurity');
            history.push('/main');
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  //refetchQuery

  return (
    //
    <>
      <Background>
        <Wrapper>
          <h1>회원가입</h1>
          <br />
          <a>Email</a>
          <form onSubmit={onSubmit}>
            <SignupInput
              type='email'
              placeholder='이메일을 입력 해주세요.'
              {...idInput}
            ></SignupInput>
            <br />
            <a>Password</a>
            <br />
            <SignupInput
              type='password'
              placeholder='비밀번호를 입력 해주세요.'
              {...passInput}
            ></SignupInput>
            <br />
            <a>Confirm Password</a>
            <br />
            <SignupInput
              type='password'
              placeholder='비밀번호를 확인 해주세요.'
              {...passConfirmInput}
            ></SignupInput>
            <br />
            <br />
            <SignupButton>회원가입</SignupButton>
          </form>
        </Wrapper>
      </Background>
    </>
  );
}

export default withRouter(SignUp);
