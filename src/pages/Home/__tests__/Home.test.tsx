import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Home } from '..';

describe('Home Page', () => {
  it('Renders', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText('Welcome', { selector: 'h1' })).toBeInTheDocument();
    expect(
      await screen.findByText('Welcome to the EP Portal remote starter template.', {
        selector: 'p',
      })
    ).toBeInTheDocument();
  });
});
