
import { useState } from 'react';
import './UserAddPage.scss';

const UserAddPage = (props) => {
    const { handleClose } = props;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    const handleSubmitBtn = () => {
        alert(`${email} ${name}  ${city}`);
        handleClose();
    }

    return (
        <div className="form-create-user">
            <fieldset>
                <legend>Create user</legend>
                <div className="input-group">
                    <label>Email: </label>
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                </div>
                <div className="input-group">
                    <label>Name: </label>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div className="input-group">
                    <label>City: </label>
                    <input type="text" value={city} onChange={(event) => setCity(event.target.value)}></input>
                </div>
                <div>
                    <button onClick={handleSubmitBtn}>Save</button>
                </div>
            </fieldset>
        </div>
    );
}

export default UserAddPage;