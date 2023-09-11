
import axios from 'axios';
import './DeletePageCustomer.scss';

const DeletePageCustomer = (props) => {
    const { handleClose, handleFetch, customer } = props;

    const id = customer ? customer.id : '';
    const email = customer ? customer.email : '';
    // const name = user ? user.name : '';
    // const city = user ? user.city : '';

    const handleSubmit = async () => {
        //alert(`${id} ${email} ${name} ${city}`);
        let data = {
            id: id,
            email: email
        }

        await axios.delete(`http://localhost:8888/api/delete-customer`, { data });
        handleFetch('delete');
        handleClose();
    }

    return (
        <div className="form-delete-customer">
            <fieldset>
                <legend>Confirm delete</legend>
                <div className="input-group">
                    <label>Delete customer with email <span>"{email}"</span>?</label>
                </div>
                <div>
                    <button onClick={handleSubmit}>Delete</button>
                </div>
            </fieldset>
        </div>
    );
}

export default DeletePageCustomer;