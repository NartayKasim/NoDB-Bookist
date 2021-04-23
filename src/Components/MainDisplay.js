import React, { Component } from 'react';
import SearchDisplay from './Search/SearchDisplay';
import BooklistsDisplay from './Booklists/BooklistsDisplay'
import Aside from './Aside/Aside'

class MainDisplay extends Component {
    constructor() {
        super();

        this.state = {
            display : "search"
        }
    }

    toggleBooklists = () => {
        this.state.display === "search" ? this.setState({ display: "booklists" }) : this.setState({ display: "search" })
    }

    render() {
        let show = () => {
            if (this.state.display === "search") {
                return <SearchDisplay />
            }
            return <BooklistsDisplay />
        }

        return (
            <section className="main-display column column--center">
                <Aside toggleBooklists={ this.toggleBooklists } />
                { show() }
            </section>
        )
    }
}

export default MainDisplay;