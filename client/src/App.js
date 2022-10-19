import React, {  }  from 'react';
import { Router, BrowserRouterasRouter } from 'react-router'
import { DataProvider } from './GlobalState'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          hello world
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
