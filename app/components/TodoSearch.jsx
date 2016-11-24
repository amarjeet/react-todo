const React = require('react');

class TodoSearch extends React.Component {
    constructor() {
        super();
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch() {
        const showCompleted = this.refs.showCompleted.checked;
        const searchText = this.refs.searchText.value;

        this.props.onSearch(showCompleted, searchText);
    }

    render() {
        return (
            <div>
                <div className="">
                    <input type="search" ref="searchText" placeholder="Search todos" onChange={this.handleSearch}/>
                </div>
                <div>
                    <label><input type="checkbox" ref="showCompleted" onChange={this.handleSearch}/>Show completed Todos</label>
                </div>
            </div>
        );
    }
}

module.exports = TodoSearch;
