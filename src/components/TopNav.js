import './TopNav.scss';

const TopNav = () => {
    return (
        <div className="topnav">
            <a className="active" href="/">Home</a>
            <a href="/todo-app">ToDo App</a>
            <a href="/table-user">Table User</a>
            <a href="/secret">Secret</a>
        </div>
    );
}

export default TopNav;