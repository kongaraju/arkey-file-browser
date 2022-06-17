import React from 'react';
import logo from './logo.svg';
import './App.scss';

import ButtonAppBar from './components/AppHeader';
import FileBrowserDialog from './components/FileBrowserDialog';
import Disks from './components/storages-data.json';


function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <div style={{ height: 'calc(100% - 75px)', marginTop: '10px', marginLeft: '10px' }}>
        {Disks.map(disk => <FileBrowserDialog key={disk.id} name={disk.name} />)}
        
      </div>
    </div>
  );
}

export default App;
