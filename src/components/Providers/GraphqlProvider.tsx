import 'isomorphic-unfetch';

import { useRef } from 'react';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
  ServerError,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { datadogRum } from '@datadog/browser-rum';

import { useEpPortalAuth } from '@guildeducationinc/auth-frontend-tools';

export const GraphqlProvider: React.FC = ({ children }) => {
  const { getAccessToken } = useEpPortalAuth();

  const client = useRef(
    new ApolloClient({
      cache: new InMemoryCache(),
      link: from([
        setContext(async (_, { headers }) => {
          const accessToken = await getAccessToken();
          return {
            headers: {
              ...headers,
              authorization: `Bearer ${accessToken}`,
            },
          };
        }),
        onError(({ graphQLErrors, networkError, operation }) => {
          if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
              const graphqlErrorTitle = `${operation.operationName} [GraphQL error]`;
              datadogRum.addError(new Error(graphqlErrorTitle), { message, locations, path });
            });
          }

          if (networkError) {
            const networkErrorTitle = `${operation.operationName} [Network error]`;
            if ((networkError as ServerError).statusCode === 401) {
              // eslint-disable-next-line no-console
              console && console.error(networkErrorTitle, networkError);
            } else {
              datadogRum.addError(new Error(networkErrorTitle), { message: networkError });
            }
          }
        }),
        createHttpLink({ fetch, uri: `${process.env.REACT_APP_GRAPHQL_ENDPOINT}/graphql` }),
      ]),
    })
  );

  return <ApolloProvider client={client.current}>{children}</ApolloProvider>;
};
