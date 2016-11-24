const React = require('react');

const TodoList = require('TodoList');
const AddTodo = require('AddTodo');
const TodoSearch = require('TodoSearch');

class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: this._getInitialStateList().todos
        };
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    _getInitialStateList() {
        return {
            showCompleted: false,
            searchText: '',
            todos        : [
                {
                    id  : 1,
                    text: 'Walk the dog'
                },
                {
                    id  : 2,
                    text: 'Feed the cat'
                },
                {
                    id  : 3,
                    text: 'Swim the hippo'
                }
            ]
        };
    }

    handleAddTodo(text) {
        alert(`New todo: ${text}`);
    }

    handleSearch(showCompleted, searchText) {
        this.setState({
            showCompleted: showCompleted,
            searchText   : searchText.toLowerCase()
        });
    }

    render() {
        const {todos} = this.state;

        return (
            <div>
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
}

module.exports = TodoApp;
