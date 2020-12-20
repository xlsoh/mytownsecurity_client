import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStylesInput = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

// 검색창 + 검색 버튼 container
export const SearchContainer = styled.div`
  padding-top: 80px;
  padding-bottom: 10px;
  width: 580px;
  z-index: 1;
  text-align: center;
`;

export const SearchListContainer = styled.div`
  display: grid;
`;
