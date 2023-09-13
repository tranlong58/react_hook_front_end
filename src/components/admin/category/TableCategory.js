import './TableCategory.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddPageCategory from './AddPageCategory';
import EditPageCategory from './EditPageCategory';
import DeletePageCategory from './DeletePageCategory';

const TableCategory = () => {
    const [dataCategory, setDataCategory] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        fetchCategory(currPage);
    }, [currPage]);

    const fetchCategory = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8888/api/read-category?page=${page}`);
            setTotalPage(response.data.totalPage);
            setDataCategory(response.data.categoryByPage);
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
            if (dataCategory.length > 1) await fetchCategory(currPage);
            else {
                await fetchCategory(currPage - 1);
                setCurrPage(currPage - 1);
            }
        }
        else await fetchCategory(currPage);
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
    const handleShowEditModal = (category) => {
        setEditing(category);
        setShowEditModal(true);
    };
    const [editing, setEditing] = useState(null); //category editing

    //delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => {
        setDeleting(null);
        setShowDeleteModal(false);
    };
    const handleShowDeleteModal = (category) => {
        setDeleting(category);
        setShowDeleteModal(true);
    };
    const [deleting, setDeleting] = useState(null); //category deleting

    return (
        <>
            {/* Add modal */}
            <Modal show={showAddModal} size='lg' onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddPageCategory
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
                    <EditPageCategory
                        handleClose={handleCloseEditModal}
                        handleFetch={handleFetch}
                        category={editing}
                    />
                </Modal.Body>
            </Modal>

            {/* Delete modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeletePageCategory
                        handleClose={handleCloseDeleteModal}
                        handleFetch={handleFetch}
                        category={deleting}
                    />
                </Modal.Body>
            </Modal>

            <div className="container-category-table">
                <div className="title-table">
                    <div className='text'>Category list</div>
                    <div className='add-btn'>
                        <button onClick={handleShowAddModal}>Add new</button>
                    </div>
                </div>

                <table className="content-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Kind</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataCategory && dataCategory.map(category => {
                            return (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>{category.kind}</td>
                                    <td>
                                        <button className='edit-btn' onClick={() => handleShowEditModal(category)}>Edit</button>
                                        <button className='delete-btn' onClick={() => handleShowDeleteModal(category)}>Delete</button>
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

export default TableCategory;