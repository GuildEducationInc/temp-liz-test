/**
 * adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock' instead of the real implementation in jest environments
 * @packageDocumentation
 */
import jestFetchMock from 'jest-fetch-mock';

jestFetchMock.enableMocks();
