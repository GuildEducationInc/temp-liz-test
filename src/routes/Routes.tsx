import { Suspense } from 'react';

import { Route, Routes as DomRoutes } from 'react-router-dom';

import { DelayedLoader, DocumentTitleAnnouncer, DocumentTitle } from '@guildeducationinc/recess';

import { Error } from '@src/components/Error';
import { ErrorBoundary } from '@src/components/ErrorBoundary';
import { DOCUMENT_TITLE_TEMPLATE } from '@src/constants';

import { ROUTES } from './routesConfig';

export const Routes: React.FC = () => {
  return (
    <Suspense fallback={<DelayedLoader label='Page' />}>
      <DocumentTitleAnnouncer />
      <DomRoutes>
        {ROUTES.map(({ path, title, component: PageComponent }) => (
          <Route
            key={path}
            path={path}
            element={
              <ErrorBoundary errorDisplay={<Error />}>
                <DocumentTitle title={title} template={DOCUMENT_TITLE_TEMPLATE} />
                <PageComponent />
              </ErrorBoundary>
            }
          />
        ))}
        <Route
          path='*'
          element={
            <>
              <DocumentTitle title='Not Found' template={DOCUMENT_TITLE_TEMPLATE} />
              <Error message='Page not found' />
            </>
          }
        />
      </DomRoutes>
    </Suspense>
  );
};
