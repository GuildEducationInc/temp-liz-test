import { basename } from '@guildeducationinc/frontend-infrastructure';

export const appBasename = basename({
  publicPath: process.env.PUBLIC_PATH,
  /**
   * If your application is to be served at a path other than the root path, then
   * config that value here.
   */
  path: '/',
});
