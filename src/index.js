import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
