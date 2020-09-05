import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, gql } from 'apollo-boost'

const httpLink = createHttpLink({
  uri: 'https://api-us-east-1.graphcms.com/v2/ckeiqswoc3k3y01z1eupfd36k/master'
})

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
})

// client.query({
//   query: gql`
//     {
//       homeHeaders {
//         id
//         header
//       }
//     }
//   `
// }).then(response => console.log(response.data))



ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
