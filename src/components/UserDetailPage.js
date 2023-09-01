import { Link, useParams } from 'react-router-dom';
import useFetch from '../customize/useFetch';
import './UserDetailPage.scss';

const UserDetailPage = () => {
    const id = useParams().id;
    const dataUser = useFetch(`http://localhost:8888/api/show-user/${id}`);
    // console.log('params = ', useParams());
    // console.log('dataUser = ', dataUser);

    return (
        <div className="containter-user-detail">
            <div className="card-user-detail">
                <div className='title-user-detail' >Info of user {dataUser.id}</div>
                <div className='content-user-detail'>
                    <div className='email'> Email: {dataUser.email} </div>
                    <div className='name'> Name: {dataUser.name} </div>
                    <div className='city'> City: {dataUser.city} </div>
                </div>
            </div>
            <div className='back-button'>
                <Link to='/user/table'>&lt;= Back</Link>
            </div>
        </div>

    );
}

export default UserDetailPage;