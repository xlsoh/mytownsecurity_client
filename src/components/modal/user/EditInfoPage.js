import React from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../../hooks/useInput';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Input = styled.input`
  border: solid 1px #dadada;
  margin-bottom: 15px;
  padding: 10px;
  margin-left: 10px;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const EDITPASSWORD = gql`
  mutation editPassword(
    $userId: ID!
    $prevPassword: String!
    $nextPassword: String!
  ) {
    editPassword(
      userId: $userId
      prevPassword: $prevPassword
      nextPassword: $nextPassword
    )
  }
`;
const TOKENLOGOUT = gql`
  mutation logUserOut($token: String!, $state: Object!) {
    logUserOut(token: $token, state: $state) @client
  }
`;

function EditInfoPage({ userInfo }) {
  const prevPassInput = useInput('');
  const passInput = useInput('');
  const passConfirmInput = useInput('');
  const token = localStorage.getItem('token');
  const state = JSON.parse(localStorage.getItem('state'));
  const [editPasswordMutation] = useMutation(EDITPASSWORD, {
    variables: {
      userId: userInfo.id,
      prevPassword: prevPassInput.value,
      nextPassword: passInput.value,
    },
  });
  const [tokenLogoutMutation] = useMutation(TOKENLOGOUT, {
    variables: { token, state },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      prevPassInput.value == '' ||
      passInput.value == '' ||
      passConfirmInput.value == ''
    ) {
      swal('비밀번호를 입력해 주세요.', {
        button: false,
        timer: 1000,
        icon: 'info',
      });
    } else if (passInput.value !== passConfirmInput.value) {
      swal('비밀번호를 확인해 주세요.', {
        button: false,
        timer: 1000,
        icon: 'info',
      });
    } else {
      try {
        const { data } = await editPasswordMutation();
        if (data) {
          swal({
            button: false,
            icon: 'success',
            title: '비밀번호가 변경되었습니다. 다시 로그인해 주세요.',
          });
          setTimeout(() => {
            tokenLogoutMutation({ variables: { token, state } });
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <form onSubmit={onSubmit}>
            <div>
              <a>현재 비밀번호</a>
              <Input
                type='Password'
                placeholder='비밀번호를 입력해 주세요.'
                {...prevPassInput}
              />
            </div>
            <div>
              <a>새 비밀번호</a>
              <Input
                type='password'
                placeholder='새 비밀번호를 입력해 주세요.'
                {...passInput}
              />
            </div>
            <div>
              <a>새 비밀번호 확인</a>
              <Input
                type='password'
                placeholder='새 비밀번호를 확인해 주세요.'
                {...passConfirmInput}
              />
            </div>
            <Button>비밀번호 변경</Button>
          </form>
        </Wrapper>
      </Container>
    </>
  );
}

export default withRouter(EditInfoPage);
