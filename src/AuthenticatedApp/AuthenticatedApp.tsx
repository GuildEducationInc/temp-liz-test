import { useEffect } from 'react';

import { datadogRum } from '@datadog/browser-rum';

import { useAuthenticationRequired, useEpPortalAuth } from '@guildeducationinc/auth-frontend-tools';
import { DelayedLoader } from '@guildeducationinc/recess';

import { Error } from '@src/components/Error';
import { Providers } from '@src/components/Providers';
import { Routes } from '@src/routes';

export const AuthenticatedApp: React.VFC = () => {
  const authContext = useEpPortalAuth();
  useAuthenticationRequired({ context: authContext });

  useEffect(() => {
    if (authContext.authError) {
      datadogRum.addError(authContext.authError, {
        message: 'There was an error authenticating the user.',
      });
    }
  }, [authContext.authError]);

  if (authContext.authError) {
    const { authErrorMessage } = authContext;
    /* istanbul ignore next */
    const message =
      typeof authErrorMessage === 'string'
        ? authErrorMessage
        : "It looks like something didn't work quite right. Please try again in a few minutes!";

    return <Error message={message} />;
  }

  if (authContext.isLoading || !authContext.userFromIdToken) {
    return <DelayedLoader label='Application' fullPageHeight overlay loaded={false} />;
  }

  if (!authContext.isLoading && authContext.isAuthenticated && authContext.userFromIdToken) {
    return (
      <Providers>
        <Routes />
      </Providers>
    );
  }

  return <Error message='Unauthorized.' />;
};
