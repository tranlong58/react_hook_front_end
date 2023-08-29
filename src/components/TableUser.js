import './TableUser.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

const TableUser = () => {
    const [dataUsers, setDataUsers] = useState([]);

    async function fetchData() {
        let result = await axios.get('http://localhost:8888/api/show-user');
        let listUsers = result.data;

        setDataUsers(listUsers);
    }
    //DidMount
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="table-container">
            <div id="title-table-user">
                List Users
            </div>
            <table id="table-user">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>City</th>
                    </tr>
                </thead>

                <tbody>
                    {dataUsers.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.city}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    );
}

export default TableUser;