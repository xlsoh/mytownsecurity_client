import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const MiddleTemplate = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
`;

const RightTemplate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export { MiddleTemplate, RightTemplate };
