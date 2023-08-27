import logo from './logo.svg';
import './App.css';
import TopNav from './components/TopNav';

function App() {
  return (
    <div className="App">
      <TopNav />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello I'm here.</h1>
      </header>
    </div>
  );
}

export default App;
