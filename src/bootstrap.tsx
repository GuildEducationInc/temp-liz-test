import { createMemoryHistory } from 'history';
import { render } from 'react-dom';
import { Location } from 'react-router-dom';

import {
  EpPortalAuthContext,
  EpPortalAuthContextValue,
} from '@guildeducationinc/auth-frontend-tools';

import { AuthenticatedApp } from '@src/AuthenticatedApp';
import { Error } from '@src/components/Error';
import { ErrorBoundary } from '@src/components/ErrorBoundary';
import { CustomRouter } from '@src/routes';

interface MountProps {
  /**
   * Current state of the auth user, as provided by the host.
   */
  readonly authContext?: EpPortalAuthContextValue;
  /**
   * Initial url pathname to receive on mount, provided by the
   * host's shared browser history.
   */
  readonly initialPath?: string;
  /**
   * Browser history navigation provided by the host, so that
   * the remote can listen for changes across remotes and
   * redirect accordingly.
   */
  readonly onNavigate?: (location: Location) => void;
}

export const mount = (el: Element, props: MountProps) => {
  // shared auth and browser history, provided by the host on mount
  const { authContext, initialPath, onNavigate } = props;
  const history = createMemoryHistory({
    initialEntries: [initialPath || '/'],
  });

  if (onNavigate) {
    history.listen(({ location }) => {
      onNavigate(location);
    });
  }
  render(
    <ErrorBoundary errorDisplay={<Error />}>
      <CustomRouter history={history}>
        <EpPortalAuthContext.Provider value={authContext!}>
          <AuthenticatedApp />
        </EpPortalAuthContext.Provider>
      </CustomRouter>
    </ErrorBoundary>,
    el
  );

  // handle parent/host navigation
  return {
    onParentNavigate(location: Location) {
      if (!location || !history) {
        return;
      }

      const { pathname: nextPathname, search: newSearch } = location;
      const { pathname, search } = history.location;
      const nextPathnameWithSearch = nextPathname + newSearch;
      const pathnameWithSearch = pathname + search;

      if (pathnameWithSearch !== nextPathnameWithSearch) {
        history.push(nextPathnameWithSearch);
      }
    },
  };
};
