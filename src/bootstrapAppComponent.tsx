import {
  EpPortalAuthContext,
  EpPortalAuthContextValue,
} from '@guildeducationinc/auth-frontend-tools';

import { AuthenticatedApp } from '@src/AuthenticatedApp';
import { Error } from '@src/components/Error';
import { ErrorBoundary } from '@src/components/ErrorBoundary';

interface MountProps {
  /**
   * Current state of the auth user, as provided by the host.
   */
  readonly authContext?: EpPortalAuthContextValue;
}

export default function mount(props: MountProps) {
  const { authContext } = props;

  return (
    <ErrorBoundary errorDisplay={<Error />}>
      <EpPortalAuthContext.Provider value={authContext!}>
        <AuthenticatedApp />
      </EpPortalAuthContext.Provider>
    </ErrorBoundary>
  );
}
