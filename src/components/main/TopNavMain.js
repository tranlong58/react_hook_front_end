import './TopNavMain.scss';
import { NavLink, Link } from 'react-router-dom';

const TopNavMain = () => {
    return (
        <div className="topnav-main">
            <NavLink activeClassName="active-link" to="/main" exact>Home</NavLink>

            <Link to="/" exact className='to-login-page'>Log out</Link>
            <Link to="/admin" exact className='to-admin-page'>Admin</Link>
        </div>
    );
}

export default TopNavMain;