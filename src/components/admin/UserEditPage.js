
import axios from 'axios';
import './UserEditPage.scss';
import { useState } from 'react';

const UserEditPage = (props) => {
    const { handleClose, handleFetch, user } = props;

    const id = user ? user.id : '';
    //const [email, setEmail] = useState(user ? user.email : '');
    const email = user ? user.email : '';
    const [name, setName] = useState(user ? user.name : '');
    const [city, setCity] = useState(user ? user.city : '');

    const handleSubmitBtn = async () => {
        // alert(`${id} ${email} ${name} ${city}`);
        let data = {
            id: id,
            email: email,
            name: name,
            city: city,
        }
        // await axios.post('http://localhost:8888/api/update-user', data); //update new user
        // handleUpdate(data);
        // handleClose();

        if (name.trim() !== '' && city.trim() !== '') {
            await axios.post('http://localhost:8888/api/update-user', data); //update new user
            handleFetch('update');
            handleClose();
        }
        else {
            if (name.trim() === '') {
                alert(`Fill 'Name' to save`);
                return;
            }
            if (city.trim() === '') {
                alert(`Fill 'City' to save`);
                return;
            }
        }
    }

    return (
        <div className="form-edit-user">
            <fieldset>
                <legend>Edit user {id}</legend>
                <div className="input-group">
                    <label>Email: </label>
                    <input type="text" value={email} disabled></input>
                    {/* {email && <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}></input>}
                    {!email && <input type="text" value='' onChange={(event) => setEmail(event.target.value)}></input>} */}
                </div>
                <div className="input-group">
                    <label>Name: </label>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                    {/* {name && <input type="text" value={name} onChange={(event) => handleInputChange(event, setName)}></input>}
                    {!name && <input type="text" value='' onChange={(event) => handleInputChange(event, setName)}></input>} */}
                </div>
                <div className="input-group">
                    <label>City: </label>
                    <input type="text" value={city} onChange={(event) => setCity(event.target.value)}></input>
                    {/* {city && <input type="text" value={city} onChange={(event) => handleInputChange(event, setCity)}></input>}
                    {!city && <input type="text" value='' onChange={(event) => handleInputChange(event, setCity)}></input>} */}
                </div>
                <div>
                    <button onClick={handleSubmitBtn}>Save</button>
                </div>
            </fieldset>
        </div>
    );
}

export default UserEditPage;