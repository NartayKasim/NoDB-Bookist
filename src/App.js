import React, { Component } from 'react'
import MainDisplay from './Components/MainDisplay'
import background from './Assets/background.png'
import logo from './Assets/logo.png'
import books from './Assets/falling-books.png'
import './index.css'

class App extends Component {
    render() {
        return (
            <main id="main" className="App column">
                <header className="column column--center">
                    <img src={ logo } alt="" id="logo"/>
                </header>
                <img src={ background } alt="" id="background"/>
                <MainDisplay />
                <img src={ books } alt="" id="falling-books"/>
            </main>

        )
    }
}

export default App;