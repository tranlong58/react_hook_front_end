import './TableUser.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate';
import UserAddPage from './UserAddPage';
import UserEditPage from './UserEditPage';
import UserDeletePage from './UserDeletePage';

const TableUser = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        fetchUser(currPage);
    }, [currPage]);

    const fetchUser = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8888/api/show-user?page=${page}`);
            setTotalPage(response.data.numPage);
            setDataUsers(response.data.usersByPage);
        } catch (error) {
            // Xử lý lỗi nếu cần thiết
        }
    };

    const handlePageClick = (event) => {
        //xóa class active của thẻ li cuối
        // const listItems = document.querySelectorAll('ul.pagination li');
        // const lastListItem = listItems[listItems.length - 2];
        // lastListItem.classList.remove('active');

        setCurrPage(event.selected + 1);
        //console.log(event, currPage);
    };

    const handleFetch = async (type) => {
        if (type === 'delete') {
            if (dataUsers.length > 1) await fetchUser(currPage);
            else {
                // thêm class active cho thẻ li gần cuối
                // const listItems = document.querySelectorAll('ul.pagination li');
                // const lastListItem = listItems[listItems.length - 3];
                // lastListItem.classList.add('active');

                await fetchUser(currPage - 1);
                setCurrPage(currPage - 1);
            }
        }
        else await fetchUser(currPage);
    }

    //add modal
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };
    const handleShowAddModal = () => setShowAddModal(true);

    //edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const handleCloseEditModal = () => {
        setEditUser(null);
        setShowEditModal(false);
    };
    const handleShowEditModal = (user) => {
        setEditUser(user);
        setShowEditModal(true);
    };
    const [editUser, setEditUser] = useState(null); //user dang duoc select de Edit

    //delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => {
        setDeleteUser(null);
        setShowDeleteModal(false);
    };
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
                        handleFetch={handleFetch}
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
                        handleFetch={handleFetch}
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
                        handleFetch={handleFetch}
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
                        {dataUsers && dataUsers.map(user => {
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

                <div className='page-navigation-table'>
                    {
                        totalPage &&
                        <ReactPaginate
                            nextLabel="next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPage}
                            previousLabel="previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default TableUser;