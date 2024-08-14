import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Error } from '../Error';

describe('Error', () => {
  it('Renders', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='*' element={<Error message='Not Found' />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Not Found/));
  });

  it('navigates if clicking back button', () => {
    render(
      <MemoryRouter initialEntries={['/error']}>
        <Routes>
          <Route path='/' element={<>home</>} />
          <Route path='*' element={<Error message='Not Found' />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Not Found/));
    fireEvent.click(screen.getByTestId('backButton'));
    expect(screen.getByText('home'));
  });
});
