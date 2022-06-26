import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './utils/ThemeContext'
import { AuthProvider } from './utils/auth'

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  </Provider>,
  document.getElementById('root')
)
