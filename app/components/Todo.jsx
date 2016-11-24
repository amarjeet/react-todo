const React = require('react');

class Todo extends React.Component {
    render() {
        const {id, text, completed} = this.props;
        return (
            <div onClick={() => {
                this.props.onToggle(id);
            }}>
                <input type="checkbox" checked={completed} onChange={()=>{}}/>
                {text}
            </div>
        );
    }
}

module.exports = Todo;
