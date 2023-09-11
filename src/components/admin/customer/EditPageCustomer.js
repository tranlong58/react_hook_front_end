
import axios from 'axios';
import './EditPageCustomer.scss';
import { useState } from 'react';

const EditPageCustomer = (props) => {
    const { handleClose, handleFetch, customer } = props;

    const id = customer ? customer.id : '';
    //const [email, setEmail] = useState(customer ? customer.email : '');
    const email = customer ? customer.email : '';
    const [name, setName] = useState(customer ? customer.name : '');
    const [pass, setPass] = useState(customer ? customer.pass : '');

    const handleSubmit = async () => {
        // alert(`${id} ${email} ${name} ${city}`);
        let data = {
            id: id,
            email: email,
            name: name,
            pass: pass,
        }

        if (name.trim() !== '' && pass.trim() !== '') {
            await axios.put('http://localhost:8888/api/update-customer', data); //update customer
            handleFetch('update');
            handleClose();
        }
        else {
            if (name.trim() === '') {
                alert(`'Name' can not empty`);
                return;
            }
            if (pass.trim() === '') {
                alert(`'Password' can not empty`);
                return;
            }
        }
    }

    return (
        <div className="form-edit-customer">
            <fieldset>
                <legend>Edit customer <span>{`"${email}"`}</span></legend>
                <div className="input-group">
                    <label>Name: </label>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div className="input-group">
                    <label>Password: </label>
                    <input type="password" value={pass} onChange={(event) => setPass(event.target.value)}></input>
                </div>
                <div>
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </fieldset>
        </div>
    );
}

export default EditPageCustomer;