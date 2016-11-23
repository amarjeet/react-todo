const React = require('react');

class Todo extends React.Component {
    render() {
        const {id, text} = this.props;
        return (
            <div>{id} - {text}</div>
        );
    }
}

module.exports = Todo;
