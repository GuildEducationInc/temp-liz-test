import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { EpPortalAuthProvider } from '@guildeducationinc/auth-frontend-tools';
import { RecessThemeProvider } from '@guildeducationinc/recess';

import { AuthenticatedApp } from '@src/AuthenticatedApp';
import { Error } from '@src/components/Error';
import { ErrorBoundary } from '@src/components/ErrorBoundary';
import { GuildOptimizelyProvider } from '@src/components/Providers/GuildOptimizelyProvider';
import { appBasename } from '@src/utilities';

/**
 * Mount the remote app for local dev via 'yarn start', independent of the host.
 * The remote will also mount in isolation when running the 'build:cypress' command,
 * so that we can run e2e tests in our CI/CD workflows.
 *
 * @remarks
 * If compiling for staging and production, the app will not mount independently
 * when visiting the remote's deployment URL directly in the web browser.
 *
 * The Auth provider and Optimizely providers will only be configured in the host
 * when deployed to staging and prod.
 */
if (process.env.NODE_ENV !== 'production' || process.env.REACT_APP_ENABLE_CYPRESS === 'true') {
  const devRoot = document.querySelector(`#${process.env.REACT_APP_REPO_NAME}-root`);

  // only render in isolation if the dev root exists
  // this dev root should not exist within the context of the host project during local testing
  devRoot &&
    render(
      <RecessThemeProvider>
        <ErrorBoundary errorDisplay={<Error />}>
          <BrowserRouter basename={appBasename}>
            <EpPortalAuthProvider
              domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
              clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
              redirectUri={window.location.origin}
            >
              <GuildOptimizelyProvider>
                {/*
                  Adding main tag here for 'landmark' accessibility requirements when running in isolation.
                  In the deployment, this tag is injected by the host app instead.
                */}
                <main>
                  <AuthenticatedApp />
                </main>
              </GuildOptimizelyProvider>
            </EpPortalAuthProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </RecessThemeProvider>,
      document.getElementById(`${process.env.REACT_APP_REPO_NAME}-root`)
    );
}

if (module.hot) {
  module.hot.accept();
}