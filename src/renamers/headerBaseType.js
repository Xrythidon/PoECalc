export const headerBaseType = (defaultArmorType, state) => {
    let fullNameBaseType = defaultArmorType;
    switch (state.armorBaseType) {
        case "ES":
            fullNameBaseType = "Energy Shield";
            break
        case "AR":
            fullNameBaseType = "Armour";
            break
        case "EV":
            fullNameBaseType = "Evasion";
            break
    }
    return fullNameBaseType;
}
