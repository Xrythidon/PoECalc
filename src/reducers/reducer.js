export default (state, action) => {
    switch (action.type) {
      case "setBaseType":
        return { ...state, armorBaseType: action.baseType };
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
