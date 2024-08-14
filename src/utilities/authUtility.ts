import { History } from 'history';

import { AppState } from '@guildeducationinc/auth-frontend-tools';

import { appBasename } from './basename';

/**
 * Utility for Auth0 redirect callback handler.
 *
 * @example
 * ```jsx
 * import { authRedirectCallback } from '@src/utilities/authUtility';
 *
 * <EpPortalAuthProvider
 *   onRedirectCallback={appState => {
 *     authRedirectCallback(appState, history);
 *   }}
 *   {...otherProps}
 * >
 *   {children}
 * </EpPortalAuthProvider>
 * ```
 *
 * @remarks
 * - 'appState' is provided by the EpPortalAuthProvider and must be passed into this utility
 * - 'history' refers to the history object provided by the browserHistory utility
 *
 * @packageDocumentation
 */

export const authRedirectCallback = (appState: AppState = {}, history: History) => {
  // remove basename path from target url if present
  /* istanbul ignore next */
  const targetPath = appState.returnTo?.replace(appBasename, '') || history.location.pathname;
  history.replace({ pathname: targetPath });
};
