/* istanbul ignore file */
import { cacheExchange, Client, fetchExchange } from 'urql';

const createGraphqlClient = () => {
  if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
    throw Error('Missing NEXT_PUBLIC_GRAPHQL_URL');
  }

  return new Client({
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    fetchOptions: {
      credentials: 'omit',
    },
    exchanges: [cacheExchange, fetchExchange],
    requestPolicy: 'network-only',
  });
};

export default createGraphqlClient;
