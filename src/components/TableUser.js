import './TableUser.scss';
import useFetch from '../customize/useFetch';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const TableUser = () => {
    const dataUsers = useFetch('http://localhost:8888/api/show-user');

    return (
        <div className="container-user-table">
            <div className="title-user-table">
                Users list
            </div>
            <table className="content-user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Action</th>
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
                                <td><Link to={`/user/detail/${item.id}`}>Detail</Link></td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    );
}

export default TableUser;