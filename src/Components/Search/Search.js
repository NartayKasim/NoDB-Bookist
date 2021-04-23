import React, { Component } from 'react';

class Search extends Component {
    constructor() {
        super()

        this.state = {
            searchInput: ''
        }
    }

    searchInput = value => {
        this.setState({ searchInput: value })
      }
    
    searchClear = () => {
        this.setState({ searchInput: ''})
        this.props.clear()
    }
    
    render() {

        const { searchSubmit } = this.props;

        return (
            <div className="search-display__header column column--center">
                {/* SEARCH INPUT */}
                <input value={ this.state.searchInput } onChange={ e => this.searchInput(e.target.value) } placeholder="Search by Title or Author" type="text" className="input input--large shadow"/>
                {/* SEARCH BUTTONS */}
                <div className="search-buttons row row-center">
                    <button onClick={ () => searchSubmit(this.state.searchInput) } className="search-clear btn btn--large shadow">SEARCH</button>
                    <button onClick={ this.searchClear } className="search-clear btn btn--large shadow">CLEAR SEARCH</button>
                </div>
            </div>
        )
    }
}

export default Search;