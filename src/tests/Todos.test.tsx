import { screen, waitFor } from '@testing-library/react';
import Todos from '../Todos';
import { renderWithClient } from './utils';
import { server } from '../setupTests';
import { HttpResponse, http } from 'msw';

describe('Todo component', () => {
  it('render the todo successfully', async () => {
    const result = renderWithClient(<Todos />);

    await waitFor(() => result.findByText(/test1/));
    const checkbox = result.getByRole('checkbox');
    expect(checkbox.checked).toBe(true);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });

  it('render Error message if request fails', async () => {
    // https://github.com/mswjs/msw/issues/1112
    server.use(
      http.get('*/todos', (info) => {
        // respond using a mocked JSON body
        return HttpResponse.error();
      }),
    );

    const result = renderWithClient(<Todos />);
    await waitFor(() => result.findByText(/Error/));
  });
});
