
import { useHistory } from 'react-router-dom';
import './LoginPage.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

    const handleSubmit = () => {
        if (email.trim() !== '' && pass.trim() !== '') {
            if (dataCustomers.find(customer => customer.email === email)) {
                if (dataCustomers.find(customer => customer.pass === pass)) {
                    alert('success');
                    history.push('/main');
                }
                else alert('wrong pass');
            }
            else alert('wrong email');
        } else {
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
    );
}

export default LoginPage;