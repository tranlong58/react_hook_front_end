
import axios from 'axios';
import './EditPageCustomer.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';


const EditPageCustomer = (props) => {
    const { handleClose, handleFetch, customer } = props;

    const id = customer ? customer.id : '';
    //const [email, setEmail] = useState(customer ? customer.email : '');
    const email = customer ? customer.email : '';
    const [name, setName] = useState(customer ? customer.name : '');
    const [pass, setPass] = useState(customer ? customer.pass : '');

    const isValidInput = () => {
        if (name.trim() === '') {
            toast.error(`'Name' can not empty`);
            return false;
        }
        if (pass.trim() === '') {
            toast.error(`'Password' can not empty`);
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        // alert(`${id} ${email} ${name} ${city}`);
        let data = {
            id: id,
            email: email,
            name: name,
            pass: pass,
        }

        const check = isValidInput();
        if (check) {
            await axios.put('http://localhost:8888/api/update-customer', data); //update customer
            handleFetch('update');
            handleClose();
            toast.success('Update success');
        }
    }

    return (
        <>
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
        </>
    );
}

export default EditPageCustomer;