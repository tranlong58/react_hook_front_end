
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import TopNavMain from './components/main/TopNavMain';

import TopNavAdmin from './components/admin/TopNavAdmin';
import TableUser from './components/admin/TableUser';

import TableCustomer from './components/admin/customer/TableCustomer';


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

          <Route path='/admin/customer' exact>
            <header className="App-header">
              <TopNavAdmin />
            </header>
            <div>
              <TableCustomer />
            </div>
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

          {/* register page */}
          <Route path='/register' exact>
            <RegisterPage />
          </Route>

        </Switch>
      </div>
    </Router >
  );
}

export default App;
