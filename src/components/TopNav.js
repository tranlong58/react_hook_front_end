import './TopNav.scss';
import { Link, NavLink } from 'react-router-dom';

const TopNav = () => {
    return (
        <div className="topnav">
            <NavLink activeClassName="active-link" to="/" exact>Home</NavLink>
            <NavLink activeClassName="active-link" to="/todo-app">ToDo App</NavLink>
            <NavLink activeClassName="active-link" to="/table-user">Table User</NavLink>
            <NavLink activeClassName="active-link" to="/secret">Secret</NavLink>
        </div>
    );
}

export default TopNav;