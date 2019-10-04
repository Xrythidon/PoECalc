import React, { useEffect, useReducer } from 'react';

import { findBaseTypeObject, getTotalArmor, getExplicitFlat, getExplicitedIncreased, getTotalQuality, baseType, itemImg, itemSlot, itemBaseName } from "./selectors/getArmorAttributes"
import ItemBox from "./components/ItemBox"
import ItemAttrContext from "./context/itemAttrContext"

function App() {

  const attrReducer = (state, action) => {
    switch (action.type) {
      case "setBaseType":
        return { ...state, armorBaseType: action.armorBaseType };
      case "setItemBaseName":
        return { ...state, itemBaseName: action.itemBaseName };
      case "setItemImg":
        return { ...state, itemImg: action.itemImg };
      case "setItemSlot":
        return { ...state, itemSlot: action.itemSlot };
      case "setArmorTotal":
        return { ...state, armorTotal: action.armorTotal };
      case "setBaseArmor":
        return { ...state, armorBase: action.armorBase };
      case "setExplicitFlat":
        return { ...state, explicitFlat: action.explicitFlat };
      case "setExplicitIncreased":
        return { ...state, explicitIncreased: action.explicitIncreased };
      case "setTotalQuality":
        return { ...state, totalQuality: action.totalQuality };
      default:
        return state;
    }
  }


  const [state, dispatch] = useReducer(attrReducer,
    {
      //Item Map Values
      armorBaseType: "",
      itemImg: "",
      itemSlot: "",
      itemBaseName: "",

      //Item Attribute State
      armorTotal: 0, // - Final Armor, will be recalculated
      armorBase: 0, // - Calculated Base Armor
      explicitFlat: 0, 
      explicitIncreased: 0,
      totalQuality: 0
    })


  const fireDispatch = (e) => {
    //Item Map Dispatch
    findBaseTypeObject(e); // Init mapobject

    dispatch({ type: "setBaseType", armorBaseType: baseType })
    dispatch({ type: "setItemImg", itemImg: itemImg })
    dispatch({ type: "setItemSlot", itemSlot: itemSlot })
    dispatch({ type: "setItemBaseName", itemBaseName: itemBaseName })

    // Item Attribute Dispatch
    dispatch({ type: "setArmorTotal", armorTotal: getTotalArmor(e) })
    dispatch({ type: "setExplicitFlat", explicitFlat: getExplicitFlat(e) })
    dispatch({ type: "setExplicitIncreased", explicitIncreased: getExplicitedIncreased(e) })
    dispatch({ type: "setTotalQuality", totalQuality: getTotalQuality(e) })
  }

  useEffect(() => {
    calculateBase();
  }, [state.armorBaseType])

  useEffect(() => {
    recalculateFinalArmor();
    console.log(state);
  }, [state.explicitFlat, state.explicitIncreased, state.totalQuality, state.armorBase])

  const calculateBase = () => {
    console.log(dispatch.state);
    const base = (state.armorTotal / (1 + ((state.explicitIncreased + state.totalQuality) / 100))) - state.explicitFlat;
    dispatch({ type: "setBaseArmor", armorBase: Math.round(base) })
  }

  const recalculateFinalArmor = () => {

    let finalArmor = Math.round((state.armorBase + state.explicitFlat) * (1 + ((state.totalQuality + state.explicitIncreased) / 100)))

    dispatch({ type: "setArmorTotal", armorTotal: finalArmor })
  }

  return (
    <ItemAttrContext.Provider value={{ state, dispatch }}>
      <textarea onChange={(e) => fireDispatch(e)}>
      </textarea>
      <p>
        ArmorBaseType: {state.armorBaseType}
        armorTotal: {state.armorTotal}
        ArmorBaseValue:{state.armorBase}
        ArmorExplicitFlat: {state.explicitFlat}
        ArmorExplicitIncreased: {state.explicitIncreased}
        ArmorTotalQuality: {state.totalQuality}
      </p>
      <ItemBox />

    </ItemAttrContext.Provider>
  );

}


export default App;


/*
MVP Goals
Have every armorBaseType work (ES,EV,AR,AR/EV, AR/ES, ES/EV, AR/EV/ES) - Get the regex to work for all.
Dont need to fill every item in map just enough for testing.
Make components reusable.
Make CSS organized

That's about it.

Things to work on:
ItemBox inputs CSS <-
ItemBox baseType Check for name (energy shield i.e.) <-
*/