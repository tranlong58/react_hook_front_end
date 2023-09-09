
import axios from 'axios';
import { useState } from 'react';
import './UserAddPage.scss';

const UserAddPage = (props) => {
    const { handleClose, handleFetch } = props;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    const handleSubmitBtn = async () => {
        let dataNewUser = {
            email: email,
            name: name,
            city: city,
        }

        if (email.trim() !== '' && name.trim() !== '' && city.trim() !== '') {
            await axios.post('http://localhost:8888/api/store-user', dataNewUser); //create new user
            //dataNewUser.id = res.data.id;
            // console.log(dataNewUser);
            handleFetch('add');
            handleClose();
        } else {
            if (email.trim() === '') {
                alert(`Fill 'Email' to save`);
                return;
            }
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
        <div className="form-create-user">
            <fieldset>
                <legend>Create user</legend>
                <div className="input-group">
                    <label>Email: </label>
                    <input required type="text" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                </div>
                <div className="input-group">
                    <label>Name: </label>
                    <input required type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div className="input-group">
                    <label>City: </label>
                    <input required type="text" value={city} onChange={(event) => setCity(event.target.value)}></input>
                </div>
                <div>
                    <button onClick={handleSubmitBtn}>Save</button>
                </div>
            </fieldset>
        </div>
    );
}

export default UserAddPage;