import React, {useContext} from "react";

const ItemAttrInput = ({attribute, updateAttribute, actionType, stateAttrName}) => {

    return (
        <div>
            <input defaultValue={attribute} onChange={(e) => {updateAttribute(parseInt(e.target.value),actionType,stateAttrName)}}/>
        </div>
    )

}


export {ItemAttrInput as default}