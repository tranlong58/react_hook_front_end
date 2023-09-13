
import axios from 'axios';
import { toast } from 'react-toastify';
import './DeletePageCategory.scss';

const DeletePageCategory = (props) => {
    const { handleClose, handleFetch, category } = props;

    const id = category ? category.id : '';
    const name = category ? category.name : '';

    const handleSubmit = async () => {
        //alert(`${id} ${email} ${name} ${city}`);
        let data = {
            id: id,
            name: name,
        }

        await axios.delete(`http://localhost:8888/api/delete-category`, { data });
        handleFetch('delete');
        handleClose();
        toast.success('Delete success');
    }

    return (
        <div className="form-delete-customer">
            <fieldset>
                <legend>Confirm delete</legend>
                <div className="input-group">
                    <label>Delete category <span>"{name}"</span>?</label>
                </div>
                <div>
                    <button onClick={handleSubmit}>Delete</button>
                </div>
            </fieldset>
        </div>
    );
}

export default DeletePageCategory;