import React, {useContext} from "react";

const ItemAttrInput = ({attribute, updateAttribute, actionType, stateAttrName}) => {

   const handleNaN = (attribute) => {
       // attribute state value that always has to be over 0

     return (attribute > 0) ? attribute : 0
   }
    return (
        <div>
            <input value={handleNaN(attribute)} onChange={(e) => {updateAttribute(handleNaN(parseInt(e.target.value)),actionType,stateAttrName)}}/>
        </div>
    )

}


export {ItemAttrInput as default}