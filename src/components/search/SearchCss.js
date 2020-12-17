import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStylesInput = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#eeeeee',
      main: '#32e0c4',
      dark: '#0d7377',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b9fffc',
      main: '#9ab3f5',
      dark: '#7579e7',
      contrastText: '#000',
    },
  },
});

// 검색창 + 검색 버튼 container
export const SearchContainer = styled.div`
  padding-top: 70px;
  padding-bottom: 10px;
  width: 580px;
  z-index: 1;
`;

export const SearchListContainer = styled.div`
  margin: 10px;
  display: grid;
`;
//export const searchResults =
