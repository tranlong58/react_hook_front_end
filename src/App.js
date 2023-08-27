import logo from './logo.svg';
import './App.css';
import TopNav from './components/TopNav';
import { useState } from 'react';

const App = () => {
  let [name, setName] = useState('Long');
  let [newName, setNewName] = useState('');

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleName = () => {
    setName(newName);
    console.log(name);
  }

  return (
    <div className="App">
      <TopNav />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello I'm {name}.</h1>
        <input type="text" value={newName} onChange={(event) => handleNewName(event)}></input>
        <button type="button" onClick={() => handleName()}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
