import './TableCustomer.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddPageCustomer from './AddPageCustomer';
import EditPageCustomer from './EditPageCustomer';
import DeletePageCustomer from './DeletePageCustomer';

const TableCustomer = () => {
    const [dataCustomers, setDataCustomers] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        fetchCustomer(currPage);
    }, [currPage]);

    const fetchCustomer = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8888/api/read-customer?page=${page}`);
            setTotalPage(response.data.totalPage);
            setDataCustomers(response.data.customersByPage);
            //console.log(response);
        } catch (error) {
            // Xử lý lỗi nếu cần thiết
        }
    };

    const handlePageClick = (event) => {
        setCurrPage(event.selected + 1);
    };

    const handleFetch = async (type) => {
        if (type === 'delete') {
            if (dataCustomers.length > 1) await fetchCustomer(currPage);
            else {
                await fetchCustomer(currPage - 1);
                setCurrPage(currPage - 1);
            }
        }
        else await fetchCustomer(currPage);
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
        setEditing(null);
        setShowEditModal(false);
    };
    const handleShowEditModal = (customer) => {
        setEditing(customer);
        setShowEditModal(true);
    };
    const [editing, setEditing] = useState(null); //customer editing

    //delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => {
        setDeleting(null);
        setShowDeleteModal(false);
    };
    const handleShowDeleteModal = (customer) => {
        setDeleting(customer);
        setShowDeleteModal(true);
    };
    const [deleting, setDeleting] = useState(null); //customer deleting

    return (
        <>
            {/* Add modal */}
            <Modal show={showAddModal} size='lg' onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddPageCustomer
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
                    <EditPageCustomer
                        handleClose={handleCloseEditModal}
                        handleFetch={handleFetch}
                        customer={editing}
                    />
                </Modal.Body>
            </Modal>

            {/* Delete modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeletePageCustomer
                        handleClose={handleCloseDeleteModal}
                        handleFetch={handleFetch}
                        customer={deleting}
                    />
                </Modal.Body>
            </Modal>

            <div className="container-customer-table">
                <div className="title-table">
                    <div className='text'>Customers list</div>
                    <div className='add-btn'>
                        <button onClick={handleShowAddModal}>Add new</button>
                    </div>
                </div>

                <table className="content-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataCustomers && dataCustomers.map(customer => {
                            return (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.email === 'longtran5801@gmail.com' ? 'Admin' : 'Guest'}</td>
                                    <td>{customer.name}</td>
                                    <td>
                                        <button className='edit-btn' onClick={() => handleShowEditModal(customer)}>Edit</button>
                                        <button className='delete-btn' onClick={() => handleShowDeleteModal(customer)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className='page-navigation-table'>
                    {
                        totalPage && totalPage > 1 &&
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
                            forcePage={currPage - 1}
                        />
                    }
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default TableCustomer;