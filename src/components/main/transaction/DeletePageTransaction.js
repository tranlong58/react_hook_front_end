
import axios from 'axios';
import { toast } from 'react-toastify';
import './DeletePageTransaction.scss';

const DeletePageTransaction = (props) => {
    const { handleClose, handleFetch, transaction } = props;

    const id = transaction ? transaction.id : '';
    const detail = transaction ? transaction.detail : '';

    const handleSubmit = async () => {
        //alert(`${id} ${email} ${name} ${city}`);
        let data = {
            id: id,
            detail: detail,
        }

        await axios.delete(`http://localhost:8888/api/delete-transaction`, { data });
        handleFetch('delete');
        handleClose();
        toast.success('Delete success');
        //alert(id);
    }

    return (
        <div className="form-delete-transaction">
            <fieldset>
                <legend>Confirm delete</legend>
                <div className="input-group">
                    <label>Delete transaction <span>"{detail}"</span>?</label>
                </div>
                <div>
                    <button onClick={handleSubmit}>Delete</button>
                </div>
            </fieldset>
        </div>
    );
}

export default DeletePageTransaction;