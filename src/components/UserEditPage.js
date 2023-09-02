
import './UserEditPage.scss';
import { useState } from 'react';

const UserEditPage = (props) => {
    const { handleClose, user } = props;

    const id = user ? user.id : '';
    const [email, setEmail] = useState(user ? user.email : '');
    const [name, setName] = useState(user ? user.name : '');
    const [city, setCity] = useState(user ? user.city : '');

    const handleSubmitBtn = () => {
        alert(`${email} ${name} ${city}`);
        handleClose();
    }

    return (
        <div className="form-edit-user">
            <fieldset>
                <legend>Edit user</legend>
                <div className="input-group">
                    <label>Email: </label>
                    {email && <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}></input>}
                    {!email && <input type="text" value='' onChange={(event) => setEmail(event.target.value)}></input>}
                </div>
                <div className="input-group">
                    <label>Name: </label>
                    {name && <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>}
                    {!name && <input type="text" value='' onChange={(event) => setName(event.target.value)}></input>}
                </div>
                <div className="input-group">
                    <label>City: </label>
                    {city && <input type="text" value={city} onChange={(event) => setCity(event.target.value)}></input>}
                    {!city && <input type="text" value='' onChange={(event) => setCity(event.target.value)}></input>}
                </div>
                <div>
                    <button onClick={handleSubmitBtn}>Save</button>
                </div>
            </fieldset>
        </div>
    );
}

export default UserEditPage;