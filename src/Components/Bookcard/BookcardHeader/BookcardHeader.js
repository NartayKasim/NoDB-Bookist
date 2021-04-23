import React from 'react'

const BookcardHeader = (props) => {
    const { title, author } = props;
    const resolveAuthor = () => {
        if (author) {
            if (author.length === 0) {
                return null
            }
            else {
                return <p id="author">&nbsp;by&nbsp;{ author.join(', ') }</p>
            }
        }
    }
    return(
        <div className="title-author row">
            <h3 id="title">{ title }</h3>
            { resolveAuthor() }
        </div>
    )
}

export default BookcardHeader;