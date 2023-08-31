import './TableUser.scss';
import useFetch from '../customize/useFetch';

const TableUser = () => {
    const dataUsers = useFetch('http://localhost:8888/api/show-user');

    return (
        <div className="table-container">
            <div id="title-table-user">
                Users list
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