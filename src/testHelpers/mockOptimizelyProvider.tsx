import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';

interface Props {
  // setting this to true makes all features enabled
  allEnabled?: boolean;
  /**
   * by setting this, you can explicitly set features to true or false.
   * { foo: false, bar: true }
   */
  featureMap?: { [key: string]: boolean };
}

export const MockOptimizelyProvider: React.FC<Props> = ({ children, featureMap, allEnabled }) => {
  const optimizelyMock = {
    onReady: jest.fn().mockImplementation(config => Promise.resolve()),
    getFeatureVariables: jest.fn().mockImplementation(() => {
      return {
        foo: 'bar',
      };
    }),
    isFeatureEnabled: jest.fn().mockImplementation((featureKey: string) => {
      if (allEnabled) {
        return true;
      }
      if (featureMap) {
        return featureMap[featureKey] || false;
      }
      return false;
    }),
    onUserUpdate: jest.fn().mockImplementation(handler => () => {
      // hi
    }),
    notificationCenter: {
      addNotificationListener: jest.fn().mockImplementation((type, handler) => {
        // hi
      }),
      removeNotificationListener: jest.fn().mockImplementation(id => {
        // hi
      }),
    },
    user: {
      id: 'testuser',
      attributes: {},
    },
    isReady: jest.fn().mockImplementation(() => true),
    getIsReadyPromiseFulfilled: () => true,
    getIsUsingSdkKey: () => true,
  } as unknown as ReactSDKClient;

  return <OptimizelyProvider optimizely={optimizelyMock}>{children}</OptimizelyProvider>;
};
