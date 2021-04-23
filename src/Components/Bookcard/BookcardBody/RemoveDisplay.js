import React, { Component } from 'react'
import axios from 'axios'

class RemoveDisplay extends Component {
    constructor() {
        super();

        this.state = {
            targetList: '',
            isbn: '',
            response: '',
            booklists: []
        }
    }

    componentDidMount = () => {
        this.setState({ booklists: this.props.book.booklists, isbn: this.props.book.isbn })
    }

    onChangeRemove = e => {
        this.setState({ targetList: e.target.value })
    }

    removeSubmit = () => {
        let params = {
            isbn: this.props.book.isbn,
            booklistName: this.state.targetList
        } 
        axios.delete('/api/booklists/removebook', { params })
        .then(response => this.setState({ response: response }))
        .then(this.props.updateRemoveBooklists(this.state.targetList))
        .then(this.props.toggleRemove())
    }

    render() {
        const { booklists } = this.props;

        const listMapper = booklists.map((list, idx) => {
                return(
                    <option className="dropdown__options" key={ idx } value={ list }>{ list }</option>
                )
            })
    
        return (
            <div className="remove-display display">
                <p>Select the booklist you would like to delete this book from and click the "Remove Book" button:</p>
                <select className="dropdown" onChange={ e => this.onChangeRemove(e) } name="lists">
                    <option className="dropdown__options" value="">choose booklist to remove from</option>
                    { listMapper }
                </select>
                <button className="btn btn--default btn--add" onClick={ this.removeSubmit }>Remove Book</button>
            </div>
        )
    }
}

export default RemoveDisplay;