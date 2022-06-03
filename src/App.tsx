import React from 'react';
import logo from './logo.svg';
import './App.scss';

import ButtonAppBar from './components/AppHeader';
import FileBrowser from './components/FileBrowser';


function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <div style={{ height: 'calc(100% - 75px)' }}>
        <FileBrowser />
      </div>
    </div>
  );
}

export default App;
