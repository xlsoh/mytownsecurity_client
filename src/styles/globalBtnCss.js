import { grid } from '@chakra-ui/react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStylesBtn = makeStyles({
  // 검색, 주소 선택
  default: {
    background: '#32e0c4',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(104, 212, 174, .3)',
    color: 'white',
    height: 46,
    padding: '0 30px',
    margin: '10px',
    '&:hover': {
      backgroundColor: '#0d7377',
      color: '#eeeeee',
      boxShadow: 'none',
    },
  },

  modalBtn: {
    background: '#0d7377',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(104, 212, 174, .3)',
    color: 'white',
    height: 30,
    padding: '0 10px',
    margin: '10px',
    float: 'right',
    '&:hover': {
      backgroundColor: '#212121',
      color: '#white',
      boxShadow: 'none',
    },
  },

  signUpBtn: {
    width: '200px',
    margin: '0 auto',
    padding: '0 20px',
    background: '#0d7377',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(104, 212, 174, .3)',
    color: 'white',
    height: 30,
    float: 'right',
    '&:hover': {
      backgroundColor: '#32e0c4',
      color: '#white',
      boxShadow: 'none',
    },
  },
});
