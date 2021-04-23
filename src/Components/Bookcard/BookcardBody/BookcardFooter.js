import React from 'react'
import { ToggleMoreInfo, ToggleRemove, ToggleAdd, ToggleRead } from './FooterButtons/FooterButtons.js'

const BookcardFooter = (props) => {
    const { toggleMoreInfo, toggleRemove, toggleAdd, toggleRead, read } = props.footerExport;

    return (
        <div className="bookcard__footer row">
            <ToggleMoreInfo toggleMoreInfo={ toggleMoreInfo } />
            <ToggleRemove toggleRemove={ toggleRemove } />
            <ToggleAdd toggleAdd={ toggleAdd } />
            <ToggleRead toggleRead={ toggleRead } read={ read }/>
        </div>
    )
}

export default BookcardFooter;