
import axios from 'axios';
import './UserDeletePage.scss';

const UserDeletePage = (props) => {
    const { handleClose, handleDelete, user } = props;

    const id = user ? user.id : '';
    const email = user ? user.email : '';
    // const name = user ? user.name : '';
    // const city = user ? user.city : '';

    const handleSubmitBtn = async () => {
        //alert(`${id} ${email} ${name} ${city}`);
        await axios.post(`http://localhost:8888/api/delete-user/${id}`, user);
        handleDelete(user);
        handleClose();
    }

    return (
        <div className="form-delete-user">
            <fieldset>
                <legend>Delete user {id}</legend>
                <div className="input-group">
                    <label>Delete user with email <span>"{email}"</span> ?</label>
                    {/* {email && <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}></input>}
                    {!email && <input type="text" value='' onChange={(event) => setEmail(event.target.value)}></input>} */}
                </div>

                <div>
                    <button onClick={handleSubmitBtn}>Delete</button>
                </div>
            </fieldset>
        </div>
    );
}

export default UserDeletePage;