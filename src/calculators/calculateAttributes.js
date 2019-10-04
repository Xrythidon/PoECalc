export const calculateBase = (dispatch, state, setBaseArmor) => {
    const base = (state.armorTotal / (1 + ((state.explicitIncreased + state.totalQuality) / 100))) - state.explicitFlat;
    dispatch(setBaseArmor(Math.round(base)))
  }

export const recalculateFinalArmor = (dispatch, state, setArmorTotal) => {
    let finalArmor = Math.round((state.armorBase + state.explicitFlat) * (1 + ((state.totalQuality + state.explicitIncreased) / 100)))
    dispatch(setArmorTotal(finalArmor))
  }