import React, { Component } from 'react';
import axios from 'axios';
import BookcardDisplay from '../Bookcard/BookcardDisplay'
import Search from './Search';

class SearchDisplay extends Component {
    constructor() {
        super();

        this.state = {
            searchResults: []
        }
    }

    searchSubmit = query => {
        axios.get(`/api/search?term=${ query }`)
        .then( response => this.setState({ searchResults: response.data }))
    }

    clear = () => {
        this.setState({ searchResults: [] })
    }

    render() {
        const searchResultsMap = this.state.searchResults.map(book => {
            return (
                <BookcardDisplay book={ book } key={ book.isbn }/>
            )
        })

        return (
            <section className="search-display column column--center">
                <Search searchSubmit={ this.searchSubmit } clear={ this.clear }/>
                <div className="search-display__body"> 
                    { searchResultsMap }
                </div>
            </section>
        )
    }
}

export default SearchDisplay;
