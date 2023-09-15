
import axios from 'axios';
import './EditPageTransaction.scss';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


const EditPageTransaction = (props) => {
    const { handleClose, handleFetch, transaction } = props;

    const id = transaction ? transaction.id : '';
    const customer_id = 1;
    const [category_id, setCategory_id] = useState(transaction ? transaction.category_id.toString() : '');
    const [amount, setAmount] = useState(transaction ? transaction.amount.toString() : '');
    const [detail, setDetail] = useState(transaction ? transaction.detail : '');
    //const [date, setDate] = useState(transaction ? transaction.date_created : '');
    const [date, setDate] = useState('');

    const nowDate = new Date();
    nowDate.setHours(7);
    nowDate.setMinutes(0);
    nowDate.setSeconds(0);
    const maxDate = String(nowDate.getDate()).padStart(2, '0');
    const maxMonth = String(nowDate.getMonth() + 1).padStart(2, '0');
    const maxYear = nowDate.getFullYear();

    const [dataCategory, setDataCategory] = useState([]);

    useEffect(() => {
        const dataString = transaction ? transaction.date_created_format : '';
        const parts = dataString.split('-');
        const formatDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        setDate(formatDate.toISOString().split('T')[0]);

        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/read-category');
            //console.log(response);
            setDataCategory(response.data);
        } catch (error) {
            // Xử lý lỗi nếu cần thiết
        }
    };

    const isValidInput = () => {
        if (category_id === '0') {
            toast.error(`'Category' can not empty`);
            return false;
        }
        const amountRegex = /^[1-9]\d*$/;
        if (!amountRegex.test(amount)) {
            toast.error(`'Amount' wrong`);
            return false;
        }
        if (amount.trim() === '') {
            toast.error(`'Amount' can not empty`);
            return false;
        }
        if (detail.trim() === '') {
            toast.error(`'Detail' can not empty`);
            return false;
        }

        if (date.trim() === '') {
            toast.error(`'Date' can not empty`);
            return false;
        }
        const objDateInput = new Date(date);
        const minDate = new Date('2022-01-01');
        if (objDateInput > nowDate || objDateInput < minDate) {
            toast.error(`Date must be between 01/01/2022 and ${maxDate}/${maxMonth}/${maxYear}`);
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        // alert(`${id} ${email} ${name} ${city}`);
        let data = {
            id: id,
            customer_id: customer_id,
            category_id: parseInt(category_id),
            amount: parseInt(amount),
            detail: detail,
            date_created: date,
        }

        const check = isValidInput();
        if (check) {
            await axios.put('http://localhost:8888/api/update-transaction', data); //update transaction
            handleFetch('update');
            handleClose();
            toast.success('Update success');
            console.log(data);
        }
    }

    return (
        <>
            <div className="form-edit-transaction">
                <fieldset>
                    <legend>Edit transaction {id}</legend>
                    <div className="input-group">
                        <label>Category: </label>
                        <select required value={category_id} onChange={(event) => setCategory_id(event.target.value)}>
                            {dataCategory.map(item => {
                                return (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                );
                            })}

                        </select>
                    </div>
                    <div className="input-group">
                        <label>Amount: </label>
                        <input required type="text" value={amount} onChange={(event) => setAmount(event.target.value)}></input>
                    </div>
                    <div className="input-group">
                        <label>Detail: </label>
                        <input required type="text" value={detail} onChange={(event) => setDetail(event.target.value)}></input>
                    </div>
                    <div className="input-group">
                        <label>Date: </label>
                        <input required type="date" min='2022-01-01' max={`${maxYear}-${maxMonth}-${maxDate}`} value={date} onChange={(event) => setDate(event.target.value)}></input>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Save</button>
                    </div>
                </fieldset>
            </div>
        </>
    );
}

export default EditPageTransaction;