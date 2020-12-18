import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  position: flex;
  border: solid 1px #fff;
  width: 300px;
  padding: 10px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 16px;
`;

const loginInput = ({ placeholder, value, onChange, type = 'text' }) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    ></Input>
  );
};

loginInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default withRouter(loginInput);
