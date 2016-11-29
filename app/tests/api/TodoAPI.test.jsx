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
                id       : '23',
                text     : 'This is a test todo',
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
                id       : '23',
                text     : 'This is a test todo',
                completed: false
            }];
            localStorage.setItem('todos', JSON.stringify(todos));

            const actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual(todos);

        });
    });

    describe('filterTodos', () => {
        const todos = [
            {
                id       : '1',
                text     : 'This is a test todo 1',
                completed: true
            },
            {
                id       : '2',
                text     : 'This is a test todo 2',
                completed: false
            },
            {
                id       : '3',
                text     : 'This is a test todo 3',
                completed: true
            }
        ];

        it('should return all items if showCompleted is true', () => {
            const filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });

        it('should return 1 item if showCompleted is false', () => {
            const filteredTodos = TodoAPI.filterTodos(todos, false, '');
            expect(filteredTodos.length).toBe(1);
        });

        it('should sort by completed status', () => {
            const filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos[0].completed).toBe(false);
        });

        it('should return all items if search text is empty', () => {
            const filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });

        it('should return 1 item if search text is is `todo 1`', () => {
            const filteredTodos = TodoAPI.filterTodos(todos, true, 'todo 1');
            expect(filteredTodos.length).toBe(1);
        });

        it('should return 0 items if search text is is `ABRACA`', () => {
            const filteredTodos = TodoAPI.filterTodos(todos, true, 'ABRACA');
            expect(filteredTodos.length).toBe(0);
        });
    });
});
