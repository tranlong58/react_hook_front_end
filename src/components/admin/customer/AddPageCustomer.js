
import axios from 'axios';
import { useState, useEffect } from 'react';
import './AddPageCustomer.scss';
import { toast } from 'react-toastify';

const AddPageCustomer = (props) => {
    const { handleClose, handleFetch } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [dataCustomers, setDataCustomers] = useState([]);

    useEffect(() => {
        fetchCustomer();
    }, []);

    const fetchCustomer = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/read-customer');
            //console.log(response);
            setDataCustomers(response.data);
        } catch (error) {
            // Xử lý lỗi nếu cần thiết
        }
    };

    const isValidInput = () => {
        if (name.trim() === '') {
            toast.error(`'Name' can not empty`);
            return false;
        }
        if (email.trim() === '') {
            toast.error(`'Email' can not empty`);
            return false;
        }
        if (pass.trim() === '') {
            toast.error(`'Password' can not empty`);
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            toast.error('Invalid email');
            return false;
        }
        if (dataCustomers.find(customer => customer.email === email)) {
            toast.error('Email was used');
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        let dataNewCustomer = {
            name: name,
            email: email,
            pass: pass,
        }

        const check = isValidInput();
        if (check) {
            await axios.post('http://localhost:8888/api/create-customer', dataNewCustomer); //create new customer
            handleFetch('add');
            handleClose();
            toast.success('Add success');
        }
    }

    return (
        <>
            <div className="form-create-customer">
                <fieldset>
                    <legend>Create customer</legend>
                    <div className="input-group">
                        <label>Name: </label>
                        <input required type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                    </div>
                    <div className="input-group">
                        <label>Email: </label>
                        <input required type="text" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                    </div>
                    <div className="input-group">
                        <label>Password: </label>
                        <input required type="password" value={pass} onChange={(event) => setPass(event.target.value)}></input>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Save</button>
                    </div>
                </fieldset>
            </div>
        </>
    );
}

export default AddPageCustomer;