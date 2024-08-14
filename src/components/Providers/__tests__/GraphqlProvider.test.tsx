import { render, screen } from '@testing-library/react';

import { GraphqlProvider } from '../GraphqlProvider';

describe('GraphqlProvider', () => {
  it('renders children', () => {
    render(<GraphqlProvider>foo</GraphqlProvider>);
    expect(screen.getByText('foo'));
  });
});
