import React from 'react'

const Dropdown = props => {
    const { booklists, onChangeExisting } = props;

    const listMapper = booklists.map(list => {
        return(
            <option className="dropdown__options" key={ list } value={ list }>{ list }</option>
        )
    })
    
    return (
        <select className="dropdown" onChange={ e => onChangeExisting(e) } name="lists">
            <option className="dropdown__options" value="">choose from available lists</option>
            { listMapper }
        </select>
    )
}

const CreateInput = props => {
    const { onChangeNew } = props;

    return (
        <input onChange={ e => onChangeNew(e) } className="input input--default" type="text" placeholder="What would you like to name your new list?"/>
    )
}

const AddExisting = props => {
    const { addBookExisting } = props;

    return (
        <button className="btn btn--default btn--add" onClick={ () => addBookExisting() }>Add Book</button>
    )
}

const AddNew = props => {
    const { addBookNew } = props;

    return (
        <button className="btn btn--default btn--add" onClick={ () => addBookNew() }>Create New Booklist</button>
    )
}

export { Dropdown, CreateInput, AddExisting, AddNew };