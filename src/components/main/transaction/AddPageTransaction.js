
import axios from 'axios';
import { useState, useEffect } from 'react';
import './AddPageTransaction.scss';
import { toast } from 'react-toastify';

const AddPageTransaction = (props) => {
    const { handleClose, handleFetch } = props;

    const customer_id = 1;
    const [category_id, setCategory_id] = useState('0');
    const [amount, setAmount] = useState('');
    const [detail, setDetail] = useState('');
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
        //const inputDate = new Date(date);
        let dataNew = {
            customer_id: customer_id,
            category_id: parseInt(category_id),
            amount: parseInt(amount),
            detail: detail,
            date_created: date,
        }

        const check = isValidInput();
        if (check) {
            await axios.post('http://localhost:8888/api/create-transaction', dataNew); //create new transaction
            handleFetch('add');
            handleClose();
            toast.success('Add success');
            //console.log(dataNew);
        }
    }

    return (
        <>
            <div className="form-create-transaction">
                <fieldset>
                    <legend>Create transaction</legend>
                    <div className="input-group">
                        <label>Category: </label>
                        <select required value={category_id} onChange={(event) => setCategory_id(event.target.value)}>
                            <option value='0'>--Select category--</option>
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

export default AddPageTransaction;