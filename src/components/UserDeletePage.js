
import './UserDeletePage.scss';

const UserDeletePage = (props) => {
    const { handleClose, user } = props;

    const id = user ? user.id : '';
    const email = user ? user.email : '';
    const name = user ? user.name : '';
    const city = user ? user.city : '';

    const handleSubmitBtn = () => {
        alert(`${email} ${name} ${city}`);
        handleClose();
    }

    return (
        <div className="form-delete-user">
            <fieldset>
                <legend>Delete user</legend>
                <div className="input-group">
                    <label>Delete user with email {email} ?</label>
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