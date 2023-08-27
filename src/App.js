import logo from './logo.svg';
import './App.css';
import TopNav from './components/TopNav';
import { useState } from 'react';

const App = () => {
  let [listActivites, setListActivites] = useState([]);
  let [newActivity, setNewActivity] = useState('');

  const handleNewActivity = (event) => {
    setNewActivity(event.target.value);
  }

  const handleAddActivity = () => {
    let tmp = { id: "1", content: newActivity }
    setListActivites([...listActivites, tmp]);
    setNewActivity('');
  }

  return (
    <div className="App">
      <TopNav />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello, here is Todo-app.</h1>
        <div className="todo-app-container">
          {listActivites.map(activity => {
            return (
              <li className="todo-app-child" key={activity.id}> {activity.content} </li>
            );
          })}
        </div>
        <input type="text" value={newActivity} onChange={(event) => handleNewActivity(event)}></input>
        <button type="button" onClick={() => handleAddActivity()}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
