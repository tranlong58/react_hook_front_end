import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import TopNav from './components/TopNav';
import ToDoApp from './components/ToDoApp';
import TableUser from './components/TableUser';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
            <h1>Hello, here is My Reactjs-app.</h1>
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
          <Route path='/table-user' exact>
            <TableUser />
          </Route>
          <Route path='/secret' exact>
            <h1> Secret </h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';
// import { useState, useEffect } from 'react';

// import TopNav from './components/TopNav';
// import ToDoApp from './components/ToDoApp';
// import TableUser from './components/TableUser';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// const App = () => {
//   const [listActions, setListActions] = useState([
//     { id: '1', content: 'learning online', author: 'Tom' },
//     { id: '2', content: 'doing homework', author: 'Jerry' },
//     { id: '3', content: 'watching youtube', author: 'Jerry' }
//   ]);
//   const [newAction, setNewAction] = useState('');

//   const handleCreateNewAction = (event) => {
//     setNewAction(event.target.value);
//   }

//   const handleAddAction = () => {
//     let tmp = { id: Math.floor(Math.random() * 10000 + 1), content: newAction, author: 'Tom' }
//     setListActions([...listActions, tmp]);
//     setNewAction('');
//   }

//   const deleteAction = (id) => {
//     let curListActions = listActions;
//     curListActions = curListActions.filter(action => action.id !== id);
//     setListActions(curListActions);
//   }

//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <TopNav />
//           <img src={logo} className="App-logo" alt="logo" />
//         </header>
//         <Switch>
//           <Route path='/' exact>
//             <h1>Hello, here is My Reactjs-app.</h1>
//           </Route>
//           <Route path='/todo-app' exact>
//             <ToDoApp
//               listActions={listActions}
//               title='ToDo app for all'
//               deleteAction={deleteAction}
//               author='all'
//             />
//             <ToDoApp
//               listActions={listActions.filter(action => action.author === 'Tom')}
//               title='ToDo app for Tom'
//               deleteAction={deleteAction}
//               author='Tom'
//             />
//             <ToDoApp
//               listActions={listActions.filter(action => action.author === 'Terry')}
//               title='ToDo app for Jerry'
//               deleteAction={deleteAction}
//               author='Jerry'
//             />
//             <input type="text" value={newAction} onChange={(event) => handleCreateNewAction(event)}></input>
//             <button type="button" onClick={() => handleAddAction()}>Add new action to Tom</button>
//           </Route>
//           <Route path='/table-user' exact>
//             <TableUser />
//           </Route>
//           <Route path='/secret' exact>
//             <h1> Secret </h1>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

