import './App.css';
import FileBrowser from './components/FileBrowser'; 
import Files from './data/files.json'

function App() {
  return (
    <div className="App">
      <FileBrowser data={Files} />
    </div>
  );
}

export default App;
