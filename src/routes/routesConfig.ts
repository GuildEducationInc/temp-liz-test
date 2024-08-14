import { lazy } from 'react';

import { Home } from '@src/pages/Home';

import { RouteObject } from './types';

/**
 * Use this file to configure route-based page or component loading.
 *
 * @remarks
 *
 * The list below will be registered in the Routes.tsx file.
 * Utilize lazy loaded imports for code splitting.
 *
 * @example
 *
 * These routes are relative to what is listed for this remote inside your host app.
 *
 * If the remote is mounted at this route in the host:
 *
 * <Route path='/template/*' element={<LazyLoadedRemote authContext={authContext} />} />
 *
 * These subroutes will appear at:
 *
 * Home - https://<yoururl>/template
 * Example - https://<yoururl>/template/example
 *
 * @packageDocumentation
 */

const Example = lazy(() => import(/* webpackChunkName: "examplePage" */ '@src/pages/Example'));

export const ROUTES: RouteObject[] = [
  {
    component: Home,
    path: '/',
    title: 'Template Home',
  },
  {
    component: Example,
    path: '/example',
    title: 'Example',
  },
];
