
import { useHistory } from 'react-router-dom';
import './LoginPage.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const history = useHistory();

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

        const customer = dataCustomers.find(item => item.email === email);
        if (!customer) {
            toast.error('Wrong email');
            return false;
        } else {
            if (customer.pass !== pass) {
                toast.error('Wrong password');
                return false;
            }
        }

        return true;
    }

    const handleSubmit = () => {
        const check = isValidInput();
        if (check) {
            history.push('/admin');
        }
    }

    return (
        <>
            <main className='main-login'>
                <div className="container">
                    <div className="login-form">
                        <h1>Login to access</h1>
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
                                Login
                            </button>
                        </div>
                        <div>
                            <Link to='/register'>Don't have an account? Register here.</Link>
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

export default LoginPage;