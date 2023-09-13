
import axios from 'axios';
import { useState, useEffect } from 'react';
import './AddPageCategory.scss';
import { toast } from 'react-toastify';

const AddPageCategory = (props) => {
    const { handleClose, handleFetch } = props;

    const [name, setName] = useState('');
    const [kind, setKind] = useState('Expense');

    const [dataCategory, setDataCategory] = useState([]);

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/read-category');
            //console.log(response);
            setDataCategory(response.data);
        } catch (error) {
            // Xử lý lỗi nếu cần thiết
        }
    };

    const isValidInput = () => {
        if (name.trim() === '') {
            toast.error(`'Name' can not empty`);
            return false;
        }
        if (kind.trim() === '') {
            toast.error(`'Kind' can not empty`);
            return false;
        }

        if (dataCategory.find(category => category.name === name)) {
            toast.error('Name was used');
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        let dataNew = {
            name: name,
            kind: kind,
        }

        const check = isValidInput();
        if (check) {
            await axios.post('http://localhost:8888/api/create-category', dataNew); //create new category
            handleFetch('add');
            handleClose();
            toast.success('Add success');
        }
    }

    return (
        <>
            <div className="form-create-category">
                <fieldset>
                    <legend>Create category</legend>
                    <div className="input-group">
                        <label>Name: </label>
                        <input required type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                    </div>
                    <div className="input-group">
                        <label>Kind: </label>
                        {/* <input required type="text" value={kind} onChange={(event) => setKind(event.target.value)}></input> */}
                        <select required value={kind} onChange={(event) => setKind(event.target.value)}>
                            <option value="Expense">Expense</option>
                            <option value="Income">Income</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Save</button>
                    </div>
                </fieldset>
            </div>
        </>
    );
}

export default AddPageCategory;