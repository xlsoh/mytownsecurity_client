import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
export const GlobalStyle = createGlobalStyle`
${reset};
a{
  text-decoration:none;
  color:inherit;
}
  * {
      box-sizing: border-box;
      margin: 0px;
      padding: 0px;
      font-family: 'Arial', sans-serif;
  }
  body{
    font-size: 14px;
    background-color:rgba(0,0,0,0);
}
`;
