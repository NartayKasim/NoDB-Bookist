import React, { Component } from 'react'
import axios from 'axios';
// - title and author:
import BookcardHeader from './BookcardHeader/BookcardHeader'
// - Booklists:
import BookcardBooklists from './BookcardBooklists'
// - variable display:
import DefaultDisplay from './BookcardBody/DefaultDisplay'
import AddDisplay from './BookcardBody/AddDisplay'
import RemoveDisplay from './BookcardBody/RemoveDisplay'
import MoreInfoDisplay from './BookcardBody/MoreInfoDisplay'
// - footer (footer buttons):
import BookcardFooter from './BookcardBody/BookcardFooter'


class BookcardDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            display: "default",
            booklists: [],
            read: [],
            messages: "",
            showAlert: false

        }
    }

    componentDidMount = () => {
        this.setState({ booklists: this.props.book.booklists, read: this.props.book.read })
    }

    toggleDefault = () => {
        this.setState({ display: "default" })
    }

    toggleMoreInfo =  () => {
        this.state.display === "more info"
        ?
        this.setState({ display: "default" })
        :
        this.setState({ display: "more info" })
    }

    toggleRemove =  () => {
        this.state.display === "remove"
        ?
        this.setState({ display: "default" })
        :
        this.setState({ display: "remove" })
    }
    
    toggleAdd =  () => {
        this.state.display === "add"
        ?
        this.setState({ display: "default" })
        :
        this.setState({ display: "add" })
    }

    toggleRead = () => {
        const body = {
            "isbn": this.props.book.isbn
        }
        axios.put('/api/booklists/update/', body).then(response => this.setState({ read: !this.state.read }))
    }

    updateBooklists = booklists => {
        let update = this.state.booklists;
        update.push(booklists)
        this.setState({ booklists: update })
    }

    updateRemoveBooklists = booklists => {
        let update = this.state.booklists.filter(booklist => booklist !== booklists)
        this.setState({ booklists: update })
    }

    setMessages = message => {
        this.setState({ messages: message, showAlert: true })
        setTimeout(() => { this.setState({ showAlert: false, messages: ""}) }, 3000);
    }

    render() {
        const { book } = this.props;

        const footerExport = {
            toggleMoreInfo: this.toggleMoreInfo,
            toggleRemove: this.toggleRemove,
            toggleAdd: this.toggleAdd,
            toggleRead: this.toggleRead,
            read: this.state.read
        }

        const variableDisplay = (() => {
            switch (this.state.display) {
                case "default":
                    return <DefaultDisplay cover={ book.covers.smallThumbnail } description={ book.description } />
                case "more info":
                    return <MoreInfoDisplay book={ book } />
                case "remove":
                    return <RemoveDisplay setMessages={ this.setMessages } book={ book } booklists={ book.booklists } updateRemoveBooklists={ this.updateRemoveBooklists } toggleRemove={ this.toggleRemove } />
                case "add":
                    return <AddDisplay setMessages = { this.setMessages } book={ book } updateBooklists={ this.updateBooklists } toggleDefault={ this.toggleDefault } />
            }
        })()

        return (
            <div className="bookcard column shadow">
                <div className="bookcard__header">
                    <BookcardHeader title={ book.title } author={ book.author } />
                </div>
                <div className="bookcard__body row">
                    { variableDisplay }
                    <BookcardBooklists booklists={ book.booklists } />
                    <div className="bookcard__footer">
                        <BookcardFooter footerExport={ footerExport }/>
                    </div>
                </div>
                { (!this.state.showAlert) ? null : <div id="messages" className="row row--center"> { this.state.messages }</div> }
            </div>
        )
    }
}

export default BookcardDisplay;