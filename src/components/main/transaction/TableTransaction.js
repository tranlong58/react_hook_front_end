import './TableTransaction.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddPageTransaction from './AddPageTransaction';
import EditPageTransaction from './EditPageTransaction';
import DeletePageTransaction from './DeletePageTransaction';

const TableTransaction = () => {
    const [dataTransaction, setDataTransaction] = useState([]);
    const [currMonth, setCurrMonth] = useState(9);
    const [currYear, setCurrYear] = useState(2023);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const nowDate = new Date();
        const nowYear = nowDate.getFullYear();
        const nowMonth = nowDate.getMonth() + 1;
        const totalMonth = (nowYear - 2022) * 12 + nowMonth;
        // console.log(dataTransaction);
        setTotalPage(totalMonth);
        fetchTransaction(currMonth, currYear);
    }, [currMonth, currYear]);

    const fetchTransaction = async (month, year) => {
        try {
            const response = await axios.get(`http://localhost:8888/api/read-transaction?month=${month}&year=${year}`);
            setDataTransaction(response.data.transactionByMonth);
            //console.log(response);
        } catch (error) {
            // Xử lý lỗi nếu cần thiết
        }
    };

    const handlePageClick = (event) => {
        //setCurrPage(event.selected + 1);
        //console.log(event);
        const selected = event.selected + 1;
        const month = selected % 12 === 0 ? 12 : selected % 12;
        const year = selected <= 12 ? 2022 : 2022 + Math.floor(selected / 12);

        //console.log(month + ' ' + year);
        setCurrMonth(month);
        setCurrYear(year);
    };

    const pageLabelBuilder = (selected) => {
        const month = selected % 12 === 0 ? 12 : selected % 12;
        const year = selected <= 12 ? 2022 : 2022 + Math.floor(selected / 12);

        if (selected === totalPage) return 'this month';
        if (selected === totalPage - 1) return 'last month';
        if (month < 10) return `0${month}/${year}`;
        else return `${month}/${year}`;
    };

    const handleFetch = async (type) => {
        await fetchTransaction(currMonth, currYear);
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
                    <AddPageTransaction
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
                    <EditPageTransaction
                        handleClose={handleCloseEditModal}
                        handleFetch={handleFetch}
                        transaction={editing}
                    />
                </Modal.Body>
            </Modal>

            {/* Delete modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeletePageTransaction
                        handleClose={handleCloseDeleteModal}
                        handleFetch={handleFetch}
                        transaction={deleting}
                    />
                </Modal.Body>
            </Modal>

            <div className="container-transaction-table">
                <div className="title-table">
                    <div className='text'>Transaction list</div>
                    <div className='add-btn'>
                        <button onClick={handleShowAddModal}>Add new</button>
                    </div>
                </div>

                <div className='page-navigation-table'>
                    <ReactPaginate
                        nextLabel="next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
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
                        pageLabelBuilder={pageLabelBuilder}
                        forcePage={totalPage - 1}
                    />
                </div>

                <table className="content-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer_id</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Detail</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataTransaction.length ? dataTransaction.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.customer_id}</td>
                                    <td>{transaction.category_name}</td>
                                    <td style={{ color: transaction.category_kind === 'Income' ? '#09d2fb' : 'red' }}>{transaction.amount}</td>
                                    <td>{transaction.detail}</td>
                                    <td>{transaction.date_created_format}</td>
                                    <td>
                                        <button className='edit-btn' onClick={() => handleShowEditModal(transaction)}>Edit</button>
                                        <button className='delete-btn' onClick={() => handleShowDeleteModal(transaction)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td colSpan='7'>No transactions</td>
                            </tr>
                        )}
                    </tbody>
                </table>
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

export default TableTransaction;