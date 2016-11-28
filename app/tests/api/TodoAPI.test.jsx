const expect = require('expect');

const TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
    it('should exist', () => {
        expect(TodoAPI).toExist();
    });

    beforeEach(() => {
        localStorage.removeItem('todos');
    });

    describe('setTodos', () => {
        it('should set valid todos array', () => {
            const todos = [{
                id: '23',
                text: 'This is a test todo',
                completed: false
            }];

            TodoAPI.setTodos(todos);
            const actualTodos = JSON.parse(localStorage.getItem('todos'));

            expect(actualTodos).toEqual(todos);
        });

        it('should not set invalid todos array', () => {
            const badTodos = {a: 'b'};
            TodoAPI.setTodos(badTodos);

            expect(localStorage.getItem('todos')).toBe(null);
        });
    });

    describe('getTodos', () => {
        it('should get an empty array when there are no todos', () => {
            const actualTodos = TodoAPI.getTodos('todos');
            expect(actualTodos).toEqual([]);
        });

        it('should return valid data if valid array in localStorage', () => {
            const todos = [{
                id: '23',
                text: 'This is a test todo',
                completed: false
            }];
            localStorage.setItem('todos', JSON.stringify(todos));

            const actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual(todos);

        });
    });
});
