const React = require('react');

class AddTodo extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const todoText = this.refs.todoText.value;
        if (todoText.length > 0) {
            console.log(todoText);
            this.refs.todoText.value = '';
            this.props.onAddTodo(todoText);
        } else {
            this.refs.todoText.focus();
        }
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" ref="todoText" placeholder="What do you want to do?"/>
            </form>
            <button className="expanded button">Add Todo</button>
        </div>);
    }
}

module.exports = AddTodo;
