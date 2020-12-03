import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

function Login() {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  return (
    <>
      <h1>로그인</h1>
      <div>
        <a>ID</a>
        <input type='text' name='id' placeholder='Enter your ID' />
        <br />
        <a>Password</a>
        <input type='text' name='password' placeholder='Enter your Password' />
      </div>
    </>
  );
}

export default withRouter(Login);
