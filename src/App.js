
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TopNavAdmin from './components/admin/TopNavAdmin';
import TableUser from './components/admin/TableUser';

import TopNavMain from './components/main/TopNavMain';
import LoginPage from './components/LoginPage';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* admin page */}
          <Route path='/admin' exact>
            <header className="App-header">
              <TopNavAdmin />
            </header>
            <h1 style={{ marginTop: '10px' }} >Admin page.</h1>
          </Route>
          <Route path='/admin/user' exact>
            <header className="App-header">
              <TopNavAdmin />
            </header>
            <TableUser />
          </Route>

          {/* main page */}
          <Route path='/main' exact>
            <header className="App-header">
              <TopNavMain />
            </header>
            <h1 style={{ marginTop: '10px' }} >Main page.</h1>
          </Route>

          {/* login page */}
          <Route path='/' exact>
            <LoginPage />
          </Route>

        </Switch>
      </div>
    </Router >
  );
}

export default App;
