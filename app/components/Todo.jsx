const React = require('react');
const moment = require('moment');

class Todo extends React.Component {
    render() {
        const {id, text, completed, createdAt, completedAt} = this.props;
        const todoClassName = completed ? 'todo todo-completed' : 'todo';

        const renderDate = () => {
            let message = 'Created';
            let timestamp = createdAt;

            if (completed) {
                message = 'Completed';
                timestamp = completedAt;
            }

            return `${message} ${moment.unix(timestamp).format('MMM Do YYYY @ hh:mm A')}`;
        };

        return (
            <div className={todoClassName} onClick={() => {
                this.props.onToggle(id);
            }}>
                <div>
                    <input type="checkbox" checked={completed} onChange={()=>{}}/>
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
            </div>
        );
    }
}

module.exports = Todo;
