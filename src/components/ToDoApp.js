import { useState } from 'react';
import './ToDoApp.scss'

const ToDoApp = (props) => {
    let { listActions, setListActions, title, author } = props;
    const [newAction, setNewAction] = useState('');

    let preListActions = listActions.slice(); //save list action array
    listActions = listActions.filter(action => action.author === author);


    const handleCreateNewAction = (event) => {
        setNewAction(event.target.value);
    }

    const handleAddAction = () => {
        let tmp = { id: Math.floor(Math.random() * 10000 + 1), content: newAction, author: author }
        setListActions([...preListActions, tmp]);
        setNewAction('');
    }

    const deleteAction = (id) => {
        preListActions = preListActions.filter(action => action.id !== id);
        setListActions(preListActions);
    }

    return (
        author === 'all' ? ( //render all actions without input div
            <div className="container-todo">
                <div className="title-todo">{title}</div>
                <div className="group-action-todo">
                    {preListActions.map(action => {
                        return (
                            <li key={action.id}> {action.content} ({action.author})
                                &nbsp;&nbsp; <span onClick={() => deleteAction(action.id)}>x</span>
                            </li>
                        );
                    })}
                </div>
                <hr />
            </div>
        ) : ( //render actions for author with input div
            <div className="container-todo">
                <div className="title-todo">{title}</div>
                <div className="group-action-todo">
                    {listActions.map(action => {
                        return (
                            <li key={action.id}> {action.content}
                                &nbsp;&nbsp; <span onClick={() => deleteAction(action.id)}>x</span>
                            </li>
                        );
                    })}
                </div>

                <div className='input-todo'>
                    <input type="text" value={newAction} onChange={(event) => handleCreateNewAction(event)}></input>
                    <button type="button" onClick={() => handleAddAction()} >Add new action to {author}</button>
                </div>

                <hr />
            </div>
        )
    );
}

export default ToDoApp;