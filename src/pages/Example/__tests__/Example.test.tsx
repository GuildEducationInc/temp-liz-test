import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Example } from '..';

describe('Example Page', () => {
  it('Renders', async () => {
    render(
      <MemoryRouter>
        <Example />
      </MemoryRouter>
    );

    expect(await screen.findByText('Example Page', { selector: 'h1' })).toBeInTheDocument();
    expect(
      await screen.findByText('This is an example nested route.', {
        selector: 'p',
      })
    ).toBeInTheDocument();
  });
});
