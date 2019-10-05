import React, { useContext } from "react";

const ItemAttrInput = ({ attribute, updateAttribute, actionType, stateAttrName, label }) => {

    const handleNaN = (attribute) => {
        // attribute state value that always has to be over 0

        return (attribute > 0) ? attribute : 0
    }
    return (
        <div className="form">
            <p>{label}</p>
            <input className="name" value={handleNaN(attribute)} onChange={(e) => { updateAttribute(handleNaN(parseInt(e.target.value)), actionType, stateAttrName) }} />
            <label htmlFor="name" className="label-name">
                <span className="content-name"></span>
            </label>

        </div>
    )

}


export { ItemAttrInput as default }