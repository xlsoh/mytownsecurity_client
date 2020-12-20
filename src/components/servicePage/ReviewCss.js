import styled from 'styled-components';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
// Review.js =====================================================

// ReviewCreate.js ===============================================

export const ReviewMiddleTemplate = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
`;

export const ReviewRightTemplate = styled.div`
  display: flex;
  width: 110px;
  flex-direction: column;
  justify-content: start;
`;

export const ReviewTemplate = styled.div`
  width: 1050px;
  height: 668px;
  position: relative;
  //border: solid 1px;
  border-color: #0d7377;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 20px auto 40px auto;
  display: flex;
  flex-direction: column;
`;
export const ReviewTextField = styled.div``;

export const reviewTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d7377',
    },
  },
});
export const useReviewInputStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
