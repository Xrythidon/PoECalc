import React, { useEffect, useReducer } from 'react';

import { findBaseTypeObject, getTotalArmor, getExplicitFlat, getExplicitedIncreased, getTotalQuality, baseType, itemImg, itemSlot, itemBaseName } from "./selectors/getArmorAttributes"
import { setArmorTotal, setExplicitFlat, setExplicitIncreased, setTotalQuality, setBaseArmor } from "./actions/attributes"
import { setBaseType, setItemBaseName, setItemImg, setItemSlot } from "./actions/itemMap"
import ItemBox from "./components/ItemBox"
import ItemAttrContext from "./context/itemAttrContext"
import attrReducer from "./reducers/reducer"
import { calculateBase, recalculateFinalArmor } from "./calculators/calculateAttributes";

function App() {

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
    // Init mapObject
    findBaseTypeObject(e);

    //Item Map Dispatch
    dispatch(setBaseType(baseType));
    dispatch(setItemImg(itemImg));
    dispatch(setItemSlot(itemSlot));
    dispatch(setItemBaseName(itemBaseName));

    // Item Attribute Dispatch
    dispatch(setArmorTotal(getTotalArmor(e)));
    dispatch(setExplicitFlat(getExplicitFlat(e)));
    dispatch(setExplicitIncreased(getExplicitedIncreased(e)));
    dispatch(setTotalQuality(getTotalQuality(e)));
  }

  // Calculates baseType initial parse
  useEffect(() => {
    calculateBase(dispatch, state, setBaseArmor);
  }, [state.armorBaseType])

  // Recalculates final armor on every state change
  useEffect(() => {
    recalculateFinalArmor(dispatch, state, setArmorTotal);
  }, [state.explicitFlat, state.explicitIncreased, state.totalQuality, state.armorBase])

  return (
    <ItemAttrContext.Provider value={{ state, dispatch }}>
      <textarea className="textarea" placeholder="Paste PoE Clipboard Here" cols="30" row="5" onChange={(e) => fireDispatch(e)}>
      </textarea>

        <p>ArmorBaseType:{state.armorBaseType}</p>
        armorTotal:{state.armorTotal + " "}
        ArmorBaseValue:{state.armorBase + " "}
        ArmorExplicitFlat:{state.explicitFlat + " "}
        ArmorExplicitIncreased:{state.explicitIncreased + " "}
        ArmorTotalQuality:{state.totalQuality + " "}

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
Organize Reducer/Dispatch stuff into own files <*
Handle 0 & null values for input values <-*
Create and hook all inputs to attributes <-*
ItemBox inputs CSS <-x
ItemBox baseType Check for name (energy shield i.e.) <-x
*/