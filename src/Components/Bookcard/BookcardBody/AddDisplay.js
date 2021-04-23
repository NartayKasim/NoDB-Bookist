import React, { Component } from 'react'
import { Dropdown, CreateInput, AddExisting, AddNew } from './AddDisplayButtons/AddDisplayButtons'
import axios from 'axios'

class AddDisplay extends Component {
    constructor() {
        super();

        this.state = {
            booklists: [],
            targetBooklist: '',
            response: '',
            isbn: '',
            userInputNew: '',
            userInputExisting: ''
        }
    }

    componentDidMount = () => {
        axios.get(`/api/booklists/dropdowns/${ this.props.book.isbn }`)
        .then(response => this.setState({ booklists: response.data}))
    }

    addBookExisting = () => {
        const body = {
            "isbn": this.props.book.isbn,
            "booklistName": this.state.userInputExisting
        }
        axios.post('/api/booklists/addbook/', body)
        .then(response => this.setState({ response: response }))
        .then(this.props.updateBooklists(this.state.userInputExisting))
        .then(this.props.setMessages(`${ this.props.book.title } has been added to the ${ this.state.userInputExisting } booklist.`))
        .then(this.props.toggleDefault())
    }

    addBookNew = () => {
        const body = {
            "isbn": this.props.book.isbn,
            "booklistName": this.state.userInputNew
        }
        axios.post('/api/booklists/create', body)
        .then(response => this.setState({ response: response }))
        .catch(err => this.setState({ response: err }))
        .then(this.handleNewBooklist)
    }

    onChangeExisting = e => {
        this.setState({ userInputExisting: e.target.value })
    }

    onChangeNew = e => {
        this.setState({ userInputNew: e.target.value })
    }

    handleNewBooklist = () => {
        if (this.state.response.data === "Accepted") {
            this.props.updateBooklists(this.state.userInputNew)
            this.props.setMessages("Booklist created!")
            this.props.toggleDefault()
        }
    }

    render() {
        return(
            <div className="add-display display">
                <span>Select one of your existing lists from the drop down menu.</span>
                <p><b> OR </b></p>
                <span>Create a new booklist by typing in the booklist's name in the input box below.</span>
                <div className="row margin--top">
                    <Dropdown booklists={ this.state.booklists } onChangeExisting={ this.onChangeExisting } />
                    <AddExisting addBookExisting={ this.addBookExisting } />
                </div>
                <div className="row margin--top">
                    <CreateInput onChangeNew={ this.onChangeNew } />
                    <AddNew addBookNew={ this.addBookNew } />
                </div>
                <p id="add-response">{ this.state.response.data }</p>
            </div>
        )
    }
}

export default AddDisplay;