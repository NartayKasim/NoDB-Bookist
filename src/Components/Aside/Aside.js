import React, { Component } from 'react';
import AsideExpanded from './AsideExpanded'

class Aside extends Component {
    constructor() {
        super();
        
        this.state = {
            expand: false,
        }
    }

    toggleLists = () => {
        this.props.toggleBooklists()
    }

    render() {
        return (
            <section className="aside--wrapper">
                <aside className="aside shadow column column--center" onClick={ this.toggleLists }>
                    <h2>BOOKLISTS</h2>
                </aside>
            </section>
        )
    }
}

export default Aside;
