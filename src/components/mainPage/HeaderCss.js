import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

// 헤더 버튼
export const useStylesHeader = makeStyles({
  header: {
    border: '1px solid #0d7377',
    borderRadius: 3,
    color: '#0d7377',
    height: 36,
    width: 80,
    padding: '0 10px',
    margin: '25px 30px 10px 0px',
    '&:hover': {
      backgroundColor: '#32e0c4',
      border: '1px solid #32e0c4',
      color: '#eeeeee',
      boxShadow: 'none',
    },
  },

  mypage: {
    width: 100,
    float: 'right',
  },
  login: {
    float: 'right',
  },
});

//로고버튼
export const HomeButton = styled.button`
  background-image: url(https://ifh.cc/g/uCRQxb.png);
  border: none;
  width: 250px;
  height: 80px;
  margin-left: 20px;
  cursor: pointer;
`;

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  background: white;
  z-index: 4;
`;
