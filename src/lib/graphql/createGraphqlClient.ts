/* istanbul ignore file */
/**
 * https://github.com/vercel/next.js/tree/canary/examples/with-urql
 */
import { cacheExchange, Client, fetchExchange } from 'urql';

const createGraphqlClient = () => {
  // let origin = process.env.NEXT_PUBLIC_GRAPHQL_ORIGIN ?? '';
  //
  // if (!origin) {
  //   const host = headers().get('host');
  //
  //   if (host?.startsWith('localhost')) {
  //     origin = `http://${host}`;
  //   } else if (host) {
  //     origin = `https://${host}`;
  //   }
  // }

  return new Client({
    url: 'https://penumbra-explorer.buber.eepy.sh/',
    fetchOptions: {
      credentials: 'omit',
    },
    exchanges: [cacheExchange, fetchExchange],
    requestPolicy: 'network-only',
  });
};

export default createGraphqlClient;
