import React, { Component } from 'react';
import { Search, ClearSearch, ViewAll, CreateNew, DeleteBooklist } from './BooklistsHeaderButtons/BooklistsHeaderButtons';
import axios from 'axios';


class BooklistsHeader extends Component {
    constructor() {
        super();

        this.state = {
            expand: "none",
            booklists: [],
            userInput: '',
            userInputExpand: '',
            userInputDelete: '',
            response: ''
        }
    }

    componentDidMount = () => {
        axios.get('/api/booklists/dropdowns/all')
        .then(response => this.setState({ booklists: response.data }))
    }

    onChangeUserInput = e => {
        this.setState({ userInput: e.target.value })
    }

    submit = () => {
        this.props.submitSearch(this.state.userInput)
    }

    clearSearch = () => {
        this.setState({ userInput: '' })
        this.props.updateBooklists()
    }

    expandHeader = format => {
        if (format === "delete") {
            this.setState({ response: '' })
            this.state.expand === "none" || this.state.expand === "create" ? this.setState({ expand: "delete" }) : this.setState({ expand: "none" })
        }
        if (format === "create") {
            this.setState({ response: '' })
            this.state.expand === "none" || this.state.expand === "delete" ? this.setState({ expand: "create" }) : this.setState({ expand: "none" })
        }
    }

    userInputDelete = e => {
        this.setState({ userInputDelete: e.target.value })
    }

    submitDelete = () => {
        let params = {
            booklistName: this.state.userInputDelete
        }
        axios.delete('/api/booklists/remove/', { params })
        .then(response => this.setState({ response: response.data}))
        .then(this.props.updateBooklists())
    }

    userInputCreate = e => {
        this.setState({ userInputExpand: e.target.value })
    }

    submitCreate = e => {
        const body = {
            "isbn": "",
            "booklistName": this.state.userInputExpand
        }
        axios.post('/api/booklists/create/', body)
        .then(response => {
            if (typeof response.data === "object") {
                let updateBooklists = []
                updateBooklists.push(...this.state.booklists, ...response.data)
                this.setState({ booklists: updateBooklists, response: `Booklist ${ e.target.value } created!`})
            }
            else {
                this.setState({ response: response.data })
            }
        })
        .then(this.props.updateBooklists())
    }

    render() {
        const expandRemove = 
            <div className="expand-remove row row--center">
                <div className="expand-remove--top row row--center">
                    <h3>Select which booklist you would like to delete:</h3>
                    <select className="dropdown" onChange={ e => this.userInputDelete(e) } name="lists">
                        <option className="dropdown__options" value="">select which booklist you would like to delete</option>
                        { this.state.booklists.map((list, idx) => {
                            return(
                                <option className="dropdown__options" key={ idx } value={ list }>{ list }</option>
                            )
                        })}
                    </select>
                    <button className="btn btn--default" onClick={ this.submitDelete }>Delete</button>
                </div>

                { this.state.response.length === 0 
                    ? 
                    null 
                    : 
                    <div id="booklists-response row row--center">
                        { this.state.response }
                    </div> 
                }
            </div>
            
        const expandCreate =
            <div className="expand-create row row--center">
                <h3>To create a new booklist, type in a name in the box below:</h3>
                <input type="text" className="input input--default" onChange={ e => this.userInputCreate(e) }/>
                <button className="btn btn--default" onClick={ this.submitCreate }>Create New Booklist</button>
                { this.state.response.length === 0 
                    ? 
                    null 
                    : 
                    <div id="booklists-response row row--center">
                        { this.state.response }
                    </div> 
                }
            </div>

        const expander = () => {
            if (this.state.expand === "create") {
                return expandCreate
            }
            else if (this.state.expand === "delete") {
                return expandRemove
            }
        }
        console.log(this.state.response)
        return(
            <div className="booklists-display__header column column--center">
                <div className="booklists-header__search column column--center">
                    <input value={ this.state.userInput } placeholder="Search Booklist Names" type="text" className="input input--large shadow" onChange={ e => this.onChangeUserInput(e) }/>
                    <div className="booklists-search-buttons row row--center">
                        <Search submit={ this.submit } />
                        <ClearSearch clearSearch={ this.clearSearch } />
                    </div>
                </div>
                <div className="booklists-header__buttons row row--center shadow">
                    <ViewAll updateBooklists={ this.props.updateBooklists }/>
                    <CreateNew expandHeader={ this.expandHeader }/>
                    <DeleteBooklist expandHeader={ this.expandHeader }/>
                </div>

                { expander() }
                

            </div>
        )
    }
}

export default BooklistsHeader;