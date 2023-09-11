
import { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterPage.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const RegisterPage = () => {
    const history = useHistory();

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

        if (name.trim() !== '' && email.trim() !== '' && pass.trim() !== '') {
            if (dataCustomers.find(customer => customer.email === email)) {
                alert('email was used');
            } else {
                await axios.post('http://localhost:8888/api/create-customer', dataNewCustomer); //create new customer
                history.push('/');
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
    );
}

export default RegisterPage;