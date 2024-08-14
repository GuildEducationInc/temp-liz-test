import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Providers } from '..';

jest.mock('@auth0/auth0-spa-js/dist/lib/auth0-spa-js.cjs.js', () => () => {
  return Promise.resolve({
    isAuthenticated: () => Promise.resolve(false),
  });
});

describe('Providers', () => {
  it('renders', async () => {
    render(
      <MemoryRouter>
        <Providers>Foo</Providers>
      </MemoryRouter>
    );
    expect(await screen.findByText('Foo'));
  });
});
