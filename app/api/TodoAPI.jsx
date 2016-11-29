var $ = require('jquery');
module.exports = {
    setTodos: (todos) => {
        if ($.isArray(todos)) {
            localStorage.setItem('todos', JSON.stringify(todos));
            return todos;
        }
    },

    getTodos: () => {
        const stringTodos = localStorage.getItem('todos');
        let todos = [];
        try {
            todos = JSON.parse(stringTodos);
        } catch (e) {

        }

        return $.isArray(todos) ? todos : [];
    },

    filterTodos: (todos, showCompleted, searchText) => {
        let filteredTodos = todos;

        // Filter by showCompleted
        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.completed || showCompleted;
        });

        // Filter by searchText
        filteredTodos = filteredTodos.filter((todo) => {
            if (searchText === undefined || searchText === null || searchText.trim() === '') {
                return true;
            } else {
                return todo.text.toLowerCase().includes(searchText.toLowerCase());
            }
        });

        // Sort incomplete todos on top
        filteredTodos.sort((a, b) => {
            if (!a.completed && b.completed) {
                return -1;
            } else if (a.completed && !b.completed) {
                return 1;
            } else {
                return 0;
            }
        });

        return filteredTodos;
    }
};
