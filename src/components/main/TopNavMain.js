import './TopNavMain.scss';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const TopNavMain = () => {
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
                    <div className='logout-main-modal'>
                        <p>Are you sure you want to log out?</p>
                        <div>
                            <Link to="/">Log out</Link>
                            <button onClick={() => handleCloseLogoutModal()}>Cancel</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="topnav-main">
                <NavLink activeClassName="active-link" to="/main" exact>Home</NavLink>

                {/* <Link to="/" className='to-login-page'>Log out</Link> */}
                <button className='to-login-page' onClick={() => handleShowLogoutModal()}>Log out</button>
                <Link to="/admin" className='to-admin-page'>Admin</Link>
            </div>
        </>
    );
}

export default TopNavMain;