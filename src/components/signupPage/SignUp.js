import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

import useInput from '../../hooks/useInput';

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
  font-size: 16px;
`;

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
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

function SignUp({ isToken, setIsToken, setUserInfo, setUserContent }) {
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

  const [tokenLoginMutation] = useMutation(TOKENLOGIN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      idInput.value == '' ||
      passInput.value == '' ||
      passConfirmInput.value == ''
    ) {
      alert('이메일과 비밀번호를 입력해주세요.');
    } else if (passInput.value !== passConfirmInput.value) {
      alert('비밀번호가 일치하지 않습니다. 다시 입력해 주세요.');
    } else {
      try {
        const {
          data: {
            signup: { token, user },
          },
        } = await signUpMutation();
        if (token !== '' || token !== undefined) {
          alert('안전궁금해의 회원이 되신걸 환영합니다!');
          const getUser = {
            id: user.id,
            email: user.email,
          };
          tokenLoginMutation({ variables: { token: token, state: getUser } });
          setIsToken(true);
          setUserInfo(getUser);
          history.push('/');
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      {!isToken && (
        <Background>
          <Wrapper>
            <a>회원가입</a>
            <br />
            <a>Email</a>
            <form onSubmit={onSubmit}>
              <SignupInput
                type='email'
                placeholder='이메일을 입력 해주세요.'
                {...idInput}
              />
              <br />
              <a>Password</a>
              <br />
              <SignupInput
                type='password'
                placeholder='비밀번호를 입력 해주세요.'
                {...passInput}
              />
              <br />
              <a>Confirm Password</a>
              <br />
              <SignupInput
                type='password'
                placeholder='비밀번호를 확인 해주세요.'
                {...passConfirmInput}
              />
              <br />
              <br />
              <SignupButton>회원가입</SignupButton>
            </form>
          </Wrapper>
        </Background>
      )}
      {isToken && null}
    </>
  );
}

export default withRouter(SignUp);
