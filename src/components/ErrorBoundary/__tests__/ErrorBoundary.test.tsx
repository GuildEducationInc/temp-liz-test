import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ErrorBoundary } from '..';

const ErrorComponent = ({ throwError }: { throwError: boolean }) => {
  if (throwError) {
    throw new Error('broken');
  }
  return <div>No Errors</div>;
};

interface TestComponentProps {
  throwError?: boolean;
  errorDisplay?: JSX.Element;
}

const TestComponent = ({ throwError = false, errorDisplay }: TestComponentProps) => {
  return render(
    <MemoryRouter>
      <ErrorBoundary errorDisplay={errorDisplay} title='test'>
        <ErrorComponent throwError={throwError} />
      </ErrorBoundary>
    </MemoryRouter>
  );
};

describe('ErrorBoundary', () => {
  // Limits number of exceptions displayed when tests run
  const errorSpy = jest.spyOn(console, 'error');
  const logSpy = jest.spyOn(console, 'log');
  errorSpy.mockImplementation(() => {}); // eslint-disable-line
  logSpy.mockImplementation(() => {}); // eslint-disable-line

  it('Renders without error', () => {
    TestComponent({});

    expect(screen.getByText('No Errors'));
  });

  it('Renders with default error messaging', () => {
    TestComponent({ throwError: true });

    // this messaging is rendered via Recess
    expect(screen.getByText("We're off course.", { selector: 'h1' }));
    expect(screen.getByText('Something went wrong.', { selector: 'h2' }));
    expect(
      screen.getByText("But let's get you back on track.", {
        selector: 'h2',
      })
    );
  });

  it('Renders with custom error messaging', () => {
    const errorDisplay = <h1>There was an error.</h1>;
    TestComponent({ throwError: true, errorDisplay });

    expect(screen.getByText('There was an error.', { selector: 'h1' }));
  });
});
