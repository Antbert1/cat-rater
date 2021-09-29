import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import store from './redux/store';
import './App.css';

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <div className="row">
          <div className="col-md-6">
            Left
          </div>
          <div className="col-md-6">
            Right
          </div>
        </div>
      </div>
    </StoreProvider>

  );
}

export default App;
