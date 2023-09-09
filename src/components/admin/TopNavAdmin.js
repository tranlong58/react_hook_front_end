import './TopNavAdmin.scss';
import { NavLink, Link } from 'react-router-dom';

const TopNavAdmin = () => {
    return (
        <div className="topnav-admin">
            <NavLink activeClassName="active-link" to="/admin" exact>Home</NavLink>
            <NavLink activeClassName="active-link" to="/admin/user" exact>User</NavLink>

            <Link to="/" exact className='to-login-page'>Log out</Link>
            <Link to="/main" exact className='to-main-page'>Main</Link>
        </div>
    );
}

export default TopNavAdmin;