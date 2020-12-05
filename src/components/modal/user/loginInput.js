import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input`
  border: solid 1px #dadada;
  margin-bottom: 15px;
  padding: 10px;
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

export default loginInput;
