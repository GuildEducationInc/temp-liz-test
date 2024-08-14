import { render, screen } from '@testing-library/react';

import { EpPortalAuthProviderMock } from '@guildeducationinc/auth-frontend-tools';

import { GuildOptimizelyProvider } from '../GuildOptimizelyProvider';

describe('GuildOptimizelyProvider', () => {
  it('Renders', () => {
    render(
      <EpPortalAuthProviderMock>
        <GuildOptimizelyProvider>foo</GuildOptimizelyProvider>
      </EpPortalAuthProviderMock>
    );

    expect(screen.getByText('foo'));
  });
});
