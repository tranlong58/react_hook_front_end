import './TopNav.scss';
import { NavLink } from 'react-router-dom';

const TopNav = () => {
    return (
        <div className="topnav">
            <NavLink activeClassName="active-link" to="/" exact>Home</NavLink>
            <NavLink activeClassName="active-link" to="/todo-app" exact>ToDo App</NavLink>
            <NavLink activeClassName="active-link" to="/user/table" exact>Table User</NavLink>
            <NavLink activeClassName="active-link" to="/secret" exact>Secret</NavLink>
        </div>
    );
}

export default TopNav;