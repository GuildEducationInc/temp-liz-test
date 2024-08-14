import { GraphqlProvider } from './GraphqlProvider';

/**
 * Place all of your providers into this component.
 *
 * @remarks
 * Do not add any providers that should only be configured in isolation,
 * such as the Auth or Optimizely providers.
 */
export const Providers: React.FC = ({ children }) => {
  return <GraphqlProvider>{children}</GraphqlProvider>;
};
