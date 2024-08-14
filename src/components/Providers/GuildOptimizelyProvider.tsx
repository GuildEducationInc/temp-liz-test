import React, { useEffect } from 'react';

import { OptimizelyProvider, createInstance } from '@optimizely/react-sdk';

import { useEpPortalAuth } from '@guildeducationinc/auth-frontend-tools';

/**
 * App-level wrapper to provide access to Optimizely's APIs.
 *
 * @remarks
 *
 * Passing the user ID allows us to get the experiment variation
 * based on configuration in Optimizely.
 *
 * @packageDocumentation
 */

declare global {
  interface Window {
    optimizelyClientInstance: any;
  }
}

export const GuildOptimizelyProvider: React.FC = ({ children }) => {
  const { userFromIdToken: user } = useEpPortalAuth();

  const optimizelyClientInstance = createInstance({
    sdkKey: process.env.REACT_APP_OPTIMIZELY_SDK_KEY,
    datafileOptions: {
      // proxy the request through Guild domains to prevent ad blocker and firewall issues
      urlTemplate: `${process.env.REACT_APP_OPTIMIZELY_URL}/optimizelydatafile=%s.json`,
    },
    eventBatchSize: 10,
    eventFlushInterval: 1000,
    /**
     * 4 => 'ERROR' in an enum, being the most critical item
     * 0 => 'NOTSET', being the least critical item
     * If in 'production' node environment, only log ERRORS, else log everything
     */
    logLevel: process.env.NODE_ENV === 'production' ? 4 : 0,
  });

  useEffect(() => {
    // set 'optimizelyClientInstance' on the window for Segment integration
    if (!window.optimizelyClientInstance) {
      window.optimizelyClientInstance = optimizelyClientInstance;
    }
  }, [optimizelyClientInstance]);

  return (
    <OptimizelyProvider
      optimizely={optimizelyClientInstance}
      timeout={1000}
      user={{ id: user?.id, attributes: { employer_uuid: user?.employerId } }}
    >
      {children}
    </OptimizelyProvider>
  );
};
