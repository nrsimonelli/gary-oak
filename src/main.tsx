import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './utils/ThemeContext';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
