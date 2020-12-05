import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ApolloProvider } from 'react-apollo-hooks';
import client from './apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
