import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { CustomRouter } from '..';

describe('CustomRouter', () => {
  it('renders', () => {
    render(
      <CustomRouter history={createMemoryHistory()} hostBasename='/'>
        foo
      </CustomRouter>
    );

    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});
