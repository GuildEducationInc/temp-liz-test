import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { EpPortalAuthProviderMock } from '@guildeducationinc/auth-frontend-tools';

import { AuthenticatedApp } from '../AuthenticatedApp';

interface TestComponentParams {
  path?: string;
  authProps?: any;
}

describe('AuthenticatedApp', () => {
  const TestComponent = ({ path = '/', authProps }: TestComponentParams) => {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <EpPortalAuthProviderMock {...authProps}>
          <AuthenticatedApp />
        </EpPortalAuthProviderMock>
      </MemoryRouter>
    );
  };

  it('Renders App in isolation', () => {
    TestComponent({});
    expect(
      screen.getByText('Welcome to the EP Portal remote starter template.', { selector: 'p' })
    );
  });

  it('Renders loader when auth is loading', () => {
    TestComponent({ authProps: { isLoading: true } });
    expect(screen.getByTestId('loaderSpinner'));
  });

  it('Renders loader when user is undefined', () => {
    TestComponent({ authProps: { isLoading: false, userFromIdToken: undefined } });
    expect(screen.getByTestId('loaderSpinner'));
  });

  it('Renders auth error', () => {
    TestComponent({
      authProps: { authError: new Error('fail') },
    });
    expect(
      screen.getByText(
        /It looks like something didn't work quite right. Please try again in a few minutes!/
      )
    );
  });

  it('Renders unauthorized error', () => {
    TestComponent({
      authProps: { isLoading: false, isAuthenticated: false },
    });
    expect(screen.getByText(/Unauthorized./));
  });
});
