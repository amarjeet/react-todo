const React = require('react');

const TodoList = require('TodoList');

class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: this._getInitialStateList()
        };
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

    render() {
        const {todos} = this.state;

        return (
            <div>
                <TodoList todos={todos}/>
            </div>
        );
    }
}

module.exports = TodoApp;
