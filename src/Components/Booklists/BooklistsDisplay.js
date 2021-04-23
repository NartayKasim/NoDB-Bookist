import React, { Component } from 'react';
import BookcardDisplay from '../Bookcard/BookcardDisplay'
import BooklistsHeader from './BooklistsHeader'
import axios from 'axios';
import AddDisplay from '../Bookcard/BookcardBody/AddDisplay';

class BooklistsDisplay extends Component {
    constructor() {
        super();

        this.state = {
            booklists: [],
            response: ''
        }
    }

    updateBooklists = () => {
        let params = {
            targetList: "all"
        }
        axios.get('/api/booklists/list', { params })
        .then(response => this.setState({ booklists: response.data }))
    }

    componentDidMount = () => {
        this.updateBooklists()
    }

    searchBooklists = term => {
        let params = {
            targetList: term
        }
        axios.get('/api/booklists/list', {params})
        .then(response => {
            if (typeof response.data === "object") {
                let updateBooklists = [];
                updateBooklists.push(response.data);
                this.setState({ booklists: updateBooklists })
            }
            else {
                this.setState({ booklists: "no matches" })
            }

        })
    }

    submitSearch = term => {
        this.searchBooklists(term)
    }

    render() {
        return (
            <section className="booklists-display column column--center">
                <BooklistsHeader submitSearch={ this.submitSearch } updateBooklists={ this.updateBooklists }/>

                <div className="booklists-display__body">
                    { typeof this.state.booklists === "string" 
                    ? 
                    <h2 id="no-matches">NO MATCHES</h2>  
                    : 
                    this.state.booklists.map(booklist => {
                        return (
                            <div className="booklist__wrapper" key={ booklist.name }>
                                <div className="booklist">
                                    <div className="booklist__header">
                                        <span><h1 className="booklist-title">{ booklist.name }</h1></span>
                                    </div>
                                    <hr/>

                                    <div className="booklist__body">
                                        { booklist.books.length === 0 
                                        ?
                                        <div><h3 style={{"color": "red"}}>This booklist is empty</h3></div> 
                                        : 
                                        booklist.books.map(book => {
                                            return(
                                            <BookcardDisplay book={ book } key={ book.isbn } /> 
                                            ) 
                                        })}
                                    </div>
                                </div>
                            </div>
                    )})}
                </div>
                
            </section>
        )
    }
}

export default BooklistsDisplay;