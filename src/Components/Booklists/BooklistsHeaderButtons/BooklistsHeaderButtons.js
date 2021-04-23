import React from 'react';

const ViewAll = props => {
    const { updateBooklists } = props;

    return (
        <button className="btn btn--default bl-search-buttons" onClick={ () => updateBooklists() }>VIEW ALL</button>
    )
}

const CreateNew = props => {
    const { expandHeader } = props;

    return (
        <button className="btn btn--default bl-search-buttons" onClick={ () => expandHeader("create") }>CREATE NEW BOOKLIST</button>
    )
}

const DeleteBooklist = props => {
    const { expandHeader } = props;
    return (
        <button className="btn btn--default bl-search-buttons" onClick={ () => expandHeader("delete") }>DELETE BOOKLIST</button>
    )
}

const Search = props => {

    const { submit } = props;

    return (
        <button className="search-clear btn btn--large shadow" onClick={ () => submit() }>SEARCH</button>
    )
}

const ClearSearch = props => {

    const { clearSearch } = props;

    return (   
        <button onClick={ () => clearSearch() } className="search-clear btn btn--large shadow">CLEAR SEARCH</button>
    )

}

export { Search, ClearSearch, ViewAll, CreateNew, DeleteBooklist };