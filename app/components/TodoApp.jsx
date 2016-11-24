const React = require('react');

const TodoList = require('TodoList');
const AddTodo = require('AddTodo');

class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: this._getInitialStateList()
        };
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    _getInitialStateList() {
        return [
            {
                id: 1,
                text: 'Walk the dog'
            },
            {
                id: 2,
                text: 'Feed the cat'
            },
            {
                id: 3,
                text: 'Swim the hippo'
            }
        ];
    }

    handleAddTodo(text) {
        alert(`New todo: ${text}`);
    }

    render() {
        const {todos} = this.state;

        return (
            <div>
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
}

module.exports = TodoApp;
