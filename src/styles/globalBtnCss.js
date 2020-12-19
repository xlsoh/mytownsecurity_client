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
    fontSize: 18,
    height: 48,
    padding: '0 30px',
    margin: '5px',
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
    height: 35,
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
    width: '320px',
    margin: '0 auto',
    padding: '0 20px',
    background: '#0d7377',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(104, 212, 174, .3)',
    color: 'white',
    height: 40,

    '&:hover': {
      backgroundColor: '#32e0c4',
      color: '#white',
      boxShadow: 'none',
    },
  },

  FavriteBtn: {
    width: '130px',
    //margin: '0 auto',
    background: '#0d7377',
    border: 0,
    borderRadius: 5,
    boxShadow: '0 3px 5px 2px rgba(104, 212, 174, .3)',
    color: 'white',
    height: 55,
    float: 'right',
    fontSize: '20px',
    '&:hover': {
      backgroundColor: '#ff926b',
      color: '#0d7377',
      boxShadow: 'none',
    },
  },

  WriteBtn: {
    width: '80px',
    height: 35,
    margin: '5px 5px 10px 0px',
    background: '#0d7377',
    border: 0,
    borderRadius: 5,
    boxShadow: '0 3px 5px 2px rgba(104, 212, 174, .3)',
    color: 'white',
    display: 'inline-block',
    float: 'right',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#ff926b',
      color: 'white',
      boxShadow: 'none',
    },
  },
});
