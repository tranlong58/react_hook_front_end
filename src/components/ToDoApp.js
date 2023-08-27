const ToDoApp = (props) => {
    let { listActions, title, deleteAction } = props;

    return (
        <div className="todo-app-container">
            <h2>{title}</h2>
            {listActions.map(action => {
                return (
                    <li className="todo-app-child" key={action.id}> {action.content}
                        &nbsp;&nbsp; <span onClick={() => deleteAction(action.id)}>x</span>
                    </li>
                );
            })}
            <hr />
        </div>
    );
}

export default ToDoApp;