import { getSubDomain } from '../getSubDomain';

declare const window: any;

describe('getSubDomain', () => {
  it('returns undefined if no subdomain', () => {
    delete window.location;
    window.location = {
      hostname: 'guildeducation.com',
    };
    expect(getSubDomain()).toEqual(undefined);
  });

  it('returns chipotle', () => {
    delete window.location;
    window.location = {
      hostname: 'chipotle.guildeducation.com',
    };
    expect(getSubDomain()).toEqual('chipotle');
  });

  it('returns undefined if subdomain is www', () => {
    delete window.location;
    window.location = {
      hostname: 'www.guildeducation.com',
    };
    expect(getSubDomain()).toEqual(undefined);
  });
});
