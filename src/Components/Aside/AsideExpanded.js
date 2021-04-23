import React from 'react';

const AsideExpanded = props => {
    const { expand } = props;

    let show = () => {
        if (expand) {
            return (
                <div className="aside-expanded shadow">
                    A
                </div>
            )
        }
        return null
    }

    return(
        <div className="aside-expanded--wrapper">
                { show() }
        </div>
    )

}

export default AsideExpanded;