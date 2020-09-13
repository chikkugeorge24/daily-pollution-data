import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

test("redirects to DataCheck page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App/>
    </Router>
  );
  expect(history.location.pathname).toBe("/");

});
