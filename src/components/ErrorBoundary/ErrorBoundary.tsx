import { datadogRum } from '@datadog/browser-rum';

import { CatchError } from '@guildeducationinc/recess';

import { Error as ErrorComponent } from '@src/components/Error';
import { PRODUCT } from '@src/constants';

/**
 * Utilize this error boundary so that the application can gracefully catch
 * and handle errors contained to specific features, without propagating
 * to the rest of the application.
 *
 * @remarks
 *
 * The default error behavior from Recess is to display a simple message,
 * stating that something went wrong. The rendered output on error may
 * be overridden using the 'errorDisplay' prop.
 *
 * @example
 *
 * With default error display:
 * ```
 * <ErrorBoundary>
 *   <YourWidgetComponent {...props} />
 * </ErrorBoundary>
 * ```
 *
 * With custom error component:
 * ```
 * <ErrorBoundary errorDisplay={<ErrorComponent />}>
 *   <YourWidgetComponent {...props} />
 * </ErrorBoundary>
 * ```
 *
 * @packageDocumentation
 */

interface ErrorBoundaryProps {
  errorDisplay?: React.ReactElement;
  title?: string;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  errorDisplay,
  title = PRODUCT,
}) => {
  return (
    <CatchError
      as={error => {
        datadogRum.addError(new Error(`${title} - ${error}`), {});
        return errorDisplay || <ErrorComponent />;
      }}
      silent
    >
      {children}
    </CatchError>
  );
};
