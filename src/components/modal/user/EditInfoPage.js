import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../../hooks/useInput';
import styled from 'styled-components';

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

/*쿼리 수정필요 */
//useMutation
const EDITPASSWORD = gql`
  mutation editPassword($id: Int!, $password: String!) {
    editPassword(id: $id, password: $password)
  }
`;

function EditInfoPage({ userInfo }) {
  const prevpassInput = useInput('');
  const passInput = useInput('');
  const passConfirmInput = useInput('');
  const [editPasswordMutation] = useMutation(EDITPASSWORD, {
    variables: {
      id: userInfo.id,
      password: passInput.value,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        prevpassInput.value == '' ||
        passInput.value == '' ||
        passConfirmInput.value == ''
      ) {
        alert('Please enter your password!🙌🏻');
      } else if (userInfo.password !== prevpassInput.value) {
        alert('Please enter your correct password!🤡');
      } else if (passInput.value !== passConfirmInput.value) {
        alert('Please check Password!🤔');
      } else {
        const { data: editPassword } = await editPasswordMutation();
        if (editPassword) {
          alert('Password change was successful!😊');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
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
                type='prevpassword'
                placeholder='비밀번호를 입력해 주세요.'
                {...prevpassInput}
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
                type='confirmpassword'
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
