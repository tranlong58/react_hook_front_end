import logo from './logo.svg';
import './App.css';
import TopNav from './components/TopNav';
import ToDoApp from './components/ToDoApp';
import { useState } from 'react';

const App = () => {
  const [listActions, setListActions] = useState([
    { id: '1', content: 'learning online', author: 'tom' },
    { id: '2', content: 'doing homework', author: 'jerry' },
    { id: '3', content: 'watching youtube', author: 'jerry' }
  ]);
  const [newAction, setNewAction] = useState('');

  const handleCreateNewAction = (event) => {
    setNewAction(event.target.value);
  }

  const handleAddAction = () => {
    let tmp = { id: Math.floor(Math.random() * 10000 + 1), content: newAction, author: 'tom' }
    setListActions([...listActions, tmp]);
    setNewAction('');
  }

  const deleteAction = (id) => {
    let curListActions = listActions;
    curListActions = curListActions.filter(action => action.id !== id);
    setListActions(curListActions);
  }

  return (
    <div className="App">
      <TopNav />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello, here is Reactjs-app.</h1>
        <ToDoApp
          listActions={listActions}
          title='My ToDo app with all'
          deleteAction={deleteAction}
        />
        <ToDoApp
          listActions={listActions.filter(action => action.author === 'tom')}
          title='My ToDo app with Tom'
          deleteAction={deleteAction}
        />
        <ToDoApp
          listActions={listActions.filter(action => action.author === 'jerry')}
          title='My ToDo app with Jerry'
          deleteAction={deleteAction}
        />
        <input type="text" value={newAction} onChange={(event) => handleCreateNewAction(event)}></input>
        <button type="button" onClick={() => handleAddAction()}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
