import React, { useContext } from "react";
import ItemAttrInput from "./ItemAttrInput"
import itemAttrContext from "../context/itemAttrContext"
import {headerBaseType} from "../renamers/headerBaseType"

const ItemBox = () => {
    const { state, dispatch } = useContext(itemAttrContext)
    // Make switch statement grabbing basetype from parent component
    // Parent component should be handling all baseType logic
    // i.e. ES basetype turns into "Energy Shield: "
    // Passdown switch statement result down to child input components

    const updateAttribute = (value, actionType, stateAttr) => {
        const dispatchObject = {}
        dispatchObject["type"] = actionType
        dispatchObject[stateAttr] = value

        dispatch(dispatchObject)
    }

    return (
        <div>
            <span className="item-box">
                <span className="header">
                    {state.itemBaseName}
                </span>
                <span className="">
                    <span className="">
                        <span className="">
                            {headerBaseType("Armor Type", state)}: {state.armorTotal}
                            <span className="item-stat-seperator"></span>
                            <ItemAttrInput attribute={state.explicitFlat} actionType={"setExplicitFlat"} stateAttrName={"explicitFlat"} label={"Explicit Flat:"} updateAttribute={updateAttribute.bind(this) } />
                            <p>Explicit Increased:</p>
                            <ItemAttrInput attribute={state.explicitIncreased} actionType={"setExplicitIncreased"} stateAttrName={"explicitIncreased"} updateAttribute={updateAttribute.bind(this)} />
                            <p>total quality:</p>
                            <ItemAttrInput attribute={state.totalQuality} actionType={"setTotalQuality"} stateAttrName={"totalQuality"} updateAttribute={updateAttribute.bind(this)} />
                        </span>
                    </span>
                </span>
                <img src={state.itemImg} />
            </span>
        </div>
    )
}


export { ItemBox as default }