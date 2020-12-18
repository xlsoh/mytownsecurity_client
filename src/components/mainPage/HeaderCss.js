import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

// 헤더 버튼
export const useStylesHeader = makeStyles({
  header: {
    border: '1px solid #0d7377',
    borderRadius: 3,
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
export const HomeButton = styled.img.attrs({
  src: 'https://ifh.cc/g/RisaJs.png',
})`
  margin-left: 10px;
  margin-top: 10px;
  width: 250px;
  height: 70px;
`;

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  background: white;
  z-index: 4;
`;
