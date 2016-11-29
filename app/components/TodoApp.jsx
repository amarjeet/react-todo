const React = require('react');
const uuid = require('node-uuid');
const moment = require('moment');

const TodoList = require('TodoList');
const AddTodo = require('AddTodo');
const TodoSearch = require('TodoSearch');
const TodoAPI = require('TodoAPI');

class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: this._getInitialStateList().todos
        };
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    _getInitialStateList() {
        return {
            showCompleted: false,
            searchText   : '',
            todos        : TodoAPI.getTodos()
        };
    }

    componentDidUpdate() {
        TodoAPI.setTodos(this.state.todos);
    }

    handleAddTodo(text) {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id         : uuid(),
                    text       : text,
                    completed  : false,
                    createdAt  : moment().unix(),
                    completedAt: undefined
                }
            ]

        });
    }

    handleToggle(id) {
        const updatedTodos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
                todo.completedAt = todo.completed ? moment().unix() : undefined
            }
            return todo;
        });
        this.setState({
            todos: updatedTodos
        });
    }

    handleSearch(showCompleted, searchText) {
        this.setState({
            showCompleted: showCompleted,
            searchText   : searchText.toLowerCase()
        });
    }

    render() {
        const {todos, showCompleted, searchText} = this.state;
        const filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

        return (
            <div>
                <h1 className="page-title">Todo App</h1>

                <div className="row">
                    <div className="small-centered small-11 medium-6 large-5 column">
                        <div className="container">
                            <TodoSearch onSearch={this.handleSearch}/>
                            <TodoList todos={filteredTodos} onToggle={this.handleToggle}/>
                            <AddTodo onAddTodo={this.handleAddTodo}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = TodoApp;
