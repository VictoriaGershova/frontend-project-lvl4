import React from 'react';
import 'regenerator-runtime/runtime';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewMessageForm from '../src/components/NewMessageForm';
import initApp from '../src/init';

const gon = {
  channels: [{ id: 1, name: 'default' }],
  currentChannelId: 1,
  messages: [],
};

const server = setupServer(
  rest.post(
    '/api/v1/channels/1/messages',
    (req, res, ctx) => res(ctx.status(201)),
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('send new message and reset form', async () => {
  const App = initApp(gon);
  render(
    <App>
      <NewMessageForm />
    </App>,
  );
  expect(screen.getByTestId('text')).toHaveFocus();
  fireEvent.change(screen.getByTestId('text'), { target: { value: 'hi' } });
  fireEvent.click(screen.getByTestId('submit'));
  await waitFor(() => expect(screen.getByTestId('submit')).not.toBeDisabled());
  expect(screen.getByTestId('text')).toHaveValue('');
  expect(screen.getByTestId('feedback')).toBeEmptyDOMElement();
});

test('render error if server error', async () => {
  server.use(
    rest.post(
      '/api/v1/channels/1/messages',
      (req, res, ctx) => res(ctx.status(500)),
    ),
  );
  const App = initApp(gon);
  render(
    <App>
      <NewMessageForm />
    </App>,
  );
  fireEvent.change(screen.getByTestId('text'), { target: { value: 'hi' } });
  fireEvent.click(screen.getByTestId('submit'));
  await waitFor(() => expect(screen.getByTestId('submit')).not.toBeDisabled());
  expect(screen.getByTestId('submit')).not.toHaveAttribute('disabled');
  expect(screen.getByTestId('text')).toHaveValue('hi');
  expect(screen.getByTestId('feedback')).toHaveTextContent('Message sending failed');
});
