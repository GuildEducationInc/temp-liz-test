import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import {
  EpPortalAuthContextValue,
  EpPortalAuthProviderMock,
} from '@guildeducationinc/auth-frontend-tools';

import { Routes } from '..';

interface TestComponentParams {
  path?: string;
  authProps?: Partial<EpPortalAuthContextValue>;
}

const TestComponent = ({ path = '/', authProps = {} }: TestComponentParams) => {
  return render(
    <MemoryRouter initialEntries={[path]} initialIndex={0}>
      <EpPortalAuthProviderMock {...authProps}>
        <Routes />
      </EpPortalAuthProviderMock>
    </MemoryRouter>
  );
};

describe('Routes', () => {
  it('Renders Home route', () => {
    TestComponent({});
    expect(screen.getByText('Welcome', { selector: 'h1' }));
  });

  it('Renders Home route in isolation', () => {
    TestComponent({ path: '/' });
    expect(screen.getByText('Welcome', { selector: 'h1' }));
  });

  it('Renders Not Found', () => {
    TestComponent({ path: '/nope' });
    expect(screen.getByText(/Page not found/));
  });
});
