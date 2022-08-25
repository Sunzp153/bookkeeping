import { HashRouter } from 'react-router-dom';
import Bookkeeping from './Bookkeeping';
import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Bookkeeping />
      </HashRouter>
    </div>
  );
}
export default App
