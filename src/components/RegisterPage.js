
import { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterPage.scss';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {

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
            toast.success('Register success');
        }
    }

    return (
        <>
            <main className='main-register'>
                <div className="container">
                    <div className="register-form">
                        <h1>Register new acount</h1>
                        <div className="input-box">
                            <i ></i>
                            <label>Name</label>
                            <input required type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                        </div>
                        <div className="input-box">
                            <i ></i>
                            <label>Email</label>
                            <input required type="text" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        </div>
                        <div className="input-box">
                            <i ></i>
                            <label>Password</label>
                            <input required type="password" value={pass} onChange={(event) => setPass(event.target.value)}></input>
                        </div>
                        <div className="btn-box">
                            <button onClick={handleSubmit}>
                                Register
                            </button>
                        </div>
                        <div>
                            <Link to='/'>Back to login.</Link>
                        </div>
                    </div>
                </div>
            </main>

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

export default RegisterPage;