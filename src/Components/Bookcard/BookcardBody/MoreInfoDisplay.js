import React from 'react'

const MoreInfoDisplay = (props) => {
    const { book } = props;

    return (
        <div className="more-info-display display row">
            <h3>MORE INFO DISPLAY</h3>  
            {book.publisher}
            {book.pageCount}
            {book.language}
            {book.isbn}
        </div>
    )
}

export default MoreInfoDisplay;