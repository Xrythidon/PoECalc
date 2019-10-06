export const calculateBase = (dispatch, {armorTotal, explicitIncreased, explicitFlat, totalQuality}, setBaseArmor) => {
    const base = (armorTotal / (1 + ((explicitIncreased + totalQuality) / 100))) - explicitFlat;
    dispatch(setBaseArmor(Math.round(base)))
  }

export const recalculateFinalArmor = (dispatch, state, setArmorTotal) => {
    let finalArmor = Math.round((state.armorBase + state.explicitFlat) * (1 + ((state.totalQuality + state.explicitIncreased) / 100)))
    dispatch(setArmorTotal(finalArmor))
  }