
import axios from 'axios';
import { useState, useEffect } from 'react';
import './AddPageCustomer.scss';

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

    const handleSubmit = async () => {
        let dataNewCustomer = {
            name: name,
            email: email,
            pass: pass,
        }

        if (email.trim() !== '' && name.trim() !== '' && pass.trim() !== '') {
            if (dataCustomers.find(customer => customer.email === email)) {
                alert('email was used');
            } else {
                await axios.post('http://localhost:8888/api/create-customer', dataNewCustomer); //create new customer
                handleFetch('add');
                handleClose();
            }
        } else {
            if (name.trim() === '') {
                alert(`'Name' can not empty`);
                return;
            }
            if (email.trim() === '') {
                alert(`'Email' can not empty`);
                return;
            }
            if (pass.trim() === '') {
                alert(`'Password' can not empty`);
                return;
            }
        }
    }

    return (
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
    );
}

export default AddPageCustomer;