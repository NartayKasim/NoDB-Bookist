import React from 'react'

const DefaultDisplay = (props) => {
    const { cover, description } = props;

    return (
        <div className="default-display display row">
            <div className="cover--wrapper column column--center">
                <img src={ cover } alt="" className="cover"/>
            </div>
            <div className="description--wrapper">
                <article className="description">
                    { typeof description !== "string" ? "NO DESCRIPTION AVAILABLE" : description }
                </article>
            </div>
        </div>
    )
}

export default DefaultDisplay;