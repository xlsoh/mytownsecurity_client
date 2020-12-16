import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

import LoginInput from './loginInput';
import LoginButton from './loginButton';
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
    signin(email: $email, password: $password) {
      token
      user {
        id
        email
        favorite
        review
      }
    }
  }
`;

const TOKENLOGIN = gql`
  mutation logUserIn($token: String!, $state: Object!) {
    logUserIn(token: $token, state: $state) @client
  }
`;

function LoginPage({ setIsToken, setUserInfo, setUserContent }) {
  const emailInput = useInput('');
  const passInput = useInput('');
  const [loginMutation, { loading }] = useMutation(SIGNIN, {
    variables: { email: emailInput.value, password: passInput.value },
  });
  const [tokenLoginMutation] = useMutation(TOKENLOGIN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (emailInput.value == '' || passInput.value == '') {
      alert('Please enter your Email or password!🙌🏻');
    } else {
      try {
        const {
          data: {
            signin: { token, user },
          },
        } = await loginMutation();
        if (token !== '' || token !== undefined) {
          const getUser = {
            id: user.id,
            email: user.email,
          };
          const getContent = {
            favorites: user.favorite,
            reviews: user.review,
          };
          tokenLoginMutation({ variables: { token: token, state: getUser } });
          setIsToken(true);
          setUserInfo(getUser);
          setUserContent(getContent);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      {loading && '로그인 중입니다. 잠시만 기다려주세요.'}
      {!loading && (
        <>
          {' '}
          <Wrapper>
            <Container>
              <div>
                <form onSubmit={onSubmit}>
                  <LoginInput
                    placeholder={'  Enter your Email'}
                    {...emailInput}
                  ></LoginInput>
                  <LoginInput
                    placeholder={'  Enter your Password'}
                    {...passInput}
                    type={'password'}
                  ></LoginInput>
                  <LoginButton text='Log in'></LoginButton>
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
