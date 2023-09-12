import './TopNavAdmin.scss';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const TopNavAdmin = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const handleCloseLogoutModal = () => {
        setShowLogoutModal(false);
    };
    const handleShowLogoutModal = () => {
        setShowLogoutModal(true);
    }

    return (
        <>
            <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='logout-admin-modal'>
                        <p>Are you sure you want to log out?</p>
                        <div>
                            <Link to="/">Log out</Link>
                            <button onClick={() => handleCloseLogoutModal()}>Cancel</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="topnav-admin">
                <NavLink activeClassName="active-link" to="/admin" exact>Home</NavLink>
                <NavLink activeClassName="active-link" to="/admin/customer" exact>Customer</NavLink>

                {/* <Link to="/" className='to-login-page'>Log out</Link> */}
                <button className='to-login-page' onClick={() => handleShowLogoutModal()}>Log out</button>
                <Link to="/main" className='to-main-page'>Main</Link>
            </div>
        </>
    );
}

export default TopNavAdmin;