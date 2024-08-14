import { useLayoutEffect, useState } from 'react';

import { BrowserHistory } from 'history';
import { RouterProps, Router } from 'react-router-dom';

/**
 * React Router v6 removed access to the history object and therefore history.listen is not longer available, which we need to routing communication between host and remote.
 *
 * @remarks
 *
 * This custom router allows us to create our own history and pass it through, while still having access to history.listen.
 * Shamelessly stolen from our friends over on Academic Portal. <3
 *
 * Inspired by: https://stackoverflow.com/questions/70646421/how-to-listen-for-route-change-in-react-router-dom-v6
 *
 * For this router, you'll need to set the basename of the template. This should match the path of the route for this remote inside the host.
 * If the route is defined like this <Route path='/template/*' element={<LazyLoadedRemote authContext={authContext} />} />
 * Then the HOST_BASENAME is '/template'.
 *
 * @packageDocumentation
 */
const HOST_BASENAME = '/template';

interface CustomRouterProps extends Omit<RouterProps, 'location' | 'navigator'> {
  history: BrowserHistory;
  hostBasename?: string;
}

export const CustomRouter: React.FC<CustomRouterProps> = ({ history, hostBasename, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      basename={hostBasename || HOST_BASENAME}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};
