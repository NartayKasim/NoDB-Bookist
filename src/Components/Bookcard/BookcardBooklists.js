import React from 'react'

const BookcardBooklists = (props) => {
    const { booklists } = props;
    return (
        <div>
            { booklists.length > 0
                ?
                <div className="booklists row">
                    <h3>Booklist(s):&nbsp;</h3> 
                    <p>{ booklists.join(', ') }</p>
                </div>
                :
                <div className="booklists row" style={{height: "3rem"}}></div>
            }
        </div>
    )
}

export default BookcardBooklists;