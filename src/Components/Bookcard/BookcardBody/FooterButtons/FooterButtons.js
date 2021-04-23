import React from 'react'

const ToggleMoreInfo = (props) => {
    const { toggleMoreInfo } = props;
    return (
        <button onClick={ () => toggleMoreInfo() }className="toggle more-info btn">More Info</button>
    )
}

const ToggleRemove = (props) => {
    const { toggleRemove } = props;
    return (
        <button onClick={ () => toggleRemove() } className="toggle remove btn">Remove</button>
    )
}

const ToggleAdd = (props) => {
    const { toggleAdd } = props;
    return (
        <button onClick={ () => toggleAdd() } className="toggle add btn">Add</button>
    )
}

const ToggleRead = (props) => {
    const { toggleRead, read } = props;
    return (
        <div id="read-button">
            { read
            ? 
            <button onClick={ () => toggleRead() } id="read-green" className="toggle read btn">
                Book Read!
            </button>
            :
            <button onClick={ () => toggleRead() } className="toggle read btn">
                Mark as Read
            </button>
            }
        </div>
    )

}

export { ToggleMoreInfo, ToggleRemove, ToggleAdd, ToggleRead };