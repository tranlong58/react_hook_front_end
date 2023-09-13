
import axios from 'axios';
import './EditPageCategory.scss';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


const EditPageCategory = (props) => {
    const { handleClose, handleFetch, category } = props;

    const id = category ? category.id : '';
    const [name, setName] = useState(category ? category.name : '');
    const [kind, setKind] = useState(category ? category.kind : '');

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

        if (dataCategory.find(category => (category.name === name && category.id !== id))) {
            toast.error('Name was used');
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        // alert(`${id} ${email} ${name} ${city}`);
        let data = {
            id: id,
            name: name,
            kind: kind,
        }

        const check = isValidInput();
        if (check) {
            await axios.put('http://localhost:8888/api/update-category', data); //update category
            handleFetch('update');
            handleClose();
            toast.success('Update success');
        }
    }

    return (
        <>
            <div className="form-edit-category">
                <fieldset>
                    <legend>Edit category {id}</legend>
                    <div className="input-group">
                        <label>Name: </label>
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                    </div>
                    <div className="input-group">
                        <label>Kind: </label>
                        {/* <input type="text" value={kind} onChange={(event) => setKind(event.target.value)}></input> */}
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

export default EditPageCategory;