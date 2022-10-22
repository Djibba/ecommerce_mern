import React, {  }  from 'react';
import { DataProvider } from './GlobalState'
import Header from './components/header/header';
import MainPages from './components/mainpages/Pages'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
