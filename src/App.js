import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import TopNav from './components/TopNav';
import ToDoApp from './components/ToDoApp';
import TableUser from './components/TableUser';
import UserDetailPage from './components/UserDetailPage';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const [listActions, setListActions] = useState([
    { id: '1', content: 'learning online', author: 'Tom' },
    { id: '2', content: 'doing homework', author: 'Jerry' },
    { id: '3', content: 'watching youtube', author: 'Jerry' }
  ]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <TopNav />
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route path='/' exact>
            <h1 style={{ marginTop: '10px' }} >Hello, here is My Reactjs-app.</h1>
          </Route>
          <Route path='/todo-app' exact>
            <ToDoApp
              listActions={listActions}
              setListActions={setListActions}
              title='ToDo app for all'
              author='all'
            />
            <ToDoApp
              listActions={listActions}
              setListActions={setListActions}
              title='ToDo app for Tom'
              author='Tom'
            />
            <ToDoApp
              listActions={listActions}
              setListActions={setListActions}
              title='ToDo app for Jerry'
              author='Jerry'
            />
          </Route>
          <Route path='/user/table' exact>
            <TableUser />
          </Route>
          <Route path='/secret' exact>
            <h1 style={{ marginTop: '10px' }}> Secret </h1>
          </Route>
          <Route path='/user/detail/:id'>
            <UserDetailPage />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
