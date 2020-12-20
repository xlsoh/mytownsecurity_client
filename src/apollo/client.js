import ApolloClient from 'apollo-boost';
import { SERVER_URI } from '../config';
const defaults = {
  check: Boolean(localStorage.getItem('token')) || false,
};

const resolvers = {
  Mutation: {
    logUserIn: (_, { token, state }, { cache }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('state', JSON.stringify(state));
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem('token');
      localStorage.removeItem('state');
      localStorage.removeItem('addressId');
      window.location = '/main';
      return null;
    },
  },
};

export default new ApolloClient({
  //uri: 'https://52.78.116.104:443',
  //uri: 'https://www.mytownsecurity.com',
  //uri: SERVER_URI,
  uri: 'http://localhost:4000',
  clientState: {
    defaults,
    resolvers,
  },
});
