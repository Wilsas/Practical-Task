import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities";

const client = new ApolloClient({
    uri: 'https://graphql.country/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            feed: relayStylePagination(),
          },
        },
      },
    })
  });

export default client;