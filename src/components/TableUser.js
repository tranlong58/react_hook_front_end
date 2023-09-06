import './TableUser.scss';
import useFetch from '../customize/useFetch';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import UserAddPage from './UserAddPage';
import UserEditPage from './UserEditPage';
import UserDeletePage from './UserDeletePage';

const TableUser = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const dataFetch = useFetch('http://localhost:8888/api/show-user'); //get all user
    //console.log(dataUsers);
    useEffect(() => {
        setDataUsers(dataFetch);
    }, [dataFetch]);

    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };
    const handleAddNewUser = (newUser) => {
        let new_dataUsers = dataUsers;
        new_dataUsers.push(newUser);

        setDataUsers(new_dataUsers);
    }
    const handleShowAddModal = () => setShowAddModal(true);


    const [showEditModal, setShowEditModal] = useState(false);
    const handleCloseEditModal = () => {
        setEditUser(null);
        setShowEditModal(false);
    };
    const handleUpdateUser = (updatedUser) => {
        let new_dataUsers = dataUsers.filter(user => user.id !== updatedUser.id);
        new_dataUsers.push(updatedUser);
        new_dataUsers.sort((user1, user2) => user1.id - user2.id);

        setDataUsers(new_dataUsers);
    }
    const handleShowEditModal = (user) => {
        setEditUser(user);
        setShowEditModal(true);
    };
    const [editUser, setEditUser] = useState(null); //user dang duoc select de Edit

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => {
        setDeleteUser(null);
        setShowDeleteModal(false);
    };
    const handleDeleteUser = (deletedUser) => {
        let new_dataUsers = dataUsers.filter(user => user.id !== deletedUser.id);

        setDataUsers(new_dataUsers);
    }
    const handleShowDeleteModal = (user) => {
        setDeleteUser(user);
        setShowDeleteModal(true);
    };
    const [deleteUser, setDeleteUser] = useState(null); //user dang duoc select de Delete

    return (
        <>
            {/* Add modal */}
            <Modal show={showAddModal} size='lg' onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserAddPage
                        handleClose={handleCloseAddModal}
                        handleAdd={handleAddNewUser}
                    />
                </Modal.Body>
            </Modal>

            {/* Edit modal */}
            <Modal show={showEditModal} size='lg' onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserEditPage
                        handleClose={handleCloseEditModal}
                        handleUpdate={handleUpdateUser}
                        user={editUser}
                    />
                </Modal.Body>
            </Modal>

            {/* Delete modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserDeletePage
                        handleClose={handleCloseDeleteModal}
                        handleDelete={handleDeleteUser}
                        user={deleteUser}
                    />
                </Modal.Body>
            </Modal>

            <div className="container-user-table">
                <div className="title-user-table">
                    <div className='text'>Users list</div>
                    <div className='add-btn'>
                        <button onClick={handleShowAddModal}>Add new user</button>
                    </div>
                </div>

                <table className="content-user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataUsers.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>{user.city}</td>
                                    <td>
                                        <button className='edit-btn' onClick={() => handleShowEditModal(user)}>Edit</button>
                                        <button className='delete-btn' onClick={() => handleShowDeleteModal(user)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        </>
    );
}

export default TableUser;