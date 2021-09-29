import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import store from './redux/store';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import RootPage from './pages';
import Upload from './pages/upload';
import './App.css';

function App() {
  return (
    <StoreProvider store={store}>
      <Router>
        <Route exact path="/" component={RootPage} />
        <Route exact path="/upload" component={Upload} />
      </Router>
    </StoreProvider>

  );
}

export default App;
