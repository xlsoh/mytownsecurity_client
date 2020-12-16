import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const loginButton = ({ text }) => {
  return <Button>{text}</Button>;
};

loginButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default withRouter(loginButton);
