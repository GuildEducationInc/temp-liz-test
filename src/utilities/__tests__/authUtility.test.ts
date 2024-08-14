import { History } from 'history';

import { authRedirectCallback } from '../authUtility';

describe('authUtility', () => {
  const mockReplace = jest.fn();
  const mockHistory = {
    location: {
      pathname: '/foo',
    },
    replace: mockReplace,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('authRedirectCallback', () => {
    it('invokes history.replace to redirect users to the appropriate target url', () => {
      authRedirectCallback({ returnTo: '/not-foo' }, mockHistory as unknown as History);

      expect(mockReplace).toHaveBeenCalledWith({ pathname: 'not-foo' });
    });
  });
});
