import armorTypeMap from "../map/armorTypeMap";

// Finish scraping for other basetypes =/

export let baseType;
export let itemImg;
export let itemSlot;
export let itemBaseName;

export const findBaseTypeObject = (e) => {
    for (let key of armorTypeMap.keys()) {
        const regex = new RegExp(key);
        const match = regex.test(e.target.value)
        if (match) {
            baseType = armorTypeMap.get(key).baseType;
            itemImg = armorTypeMap.get(key).itemImg;
            itemSlot = armorTypeMap.get(key).itemSlot;
            itemBaseName = key;
            return `${armorTypeMap.get(key)}`
        }
    }
}

export const findBaseType = (e) => {
    for (let key of armorTypeMap.keys()) {
        const regex = new RegExp(key);
        const match = regex.test(e.target.value)
        if (match) {
            baseType = armorTypeMap.get(key).baseType;
            return `${armorTypeMap.get(key)}`
        }
    }
}


export const getTotalArmor = (e) => {
    let regex;
    let text = 0;

    switch (baseType) {
        case "ES":
            regex = new RegExp(/(?:^|Energy Shield: )(\d{1,3})/);
            break;
        default:
            return (text = "Error")
    }

    const match = regex.test(e.target.value)

    if (match) {
        text = e.target.value.match(regex)[1];
    }
    return parseInt(text);
}


export const getTotalQuality = (e) => {
    let text = 0;

    //const regex = new RegExp(/(?<=Quality: \+)(\d{1,3})/);
    const regex = new RegExp(/(?:^|Quality: \+)(\d{1,3})/);

    const match = regex.test(e.target.value)

    if (match) {
        text = e.target.value.match(regex)[1];
    }
    return parseInt(text);

}

export const getExplicitFlat = (e) => {
    let regex;
    let text = 0;

    switch (baseType) {
        case "ES":
            //regex = new RegExp(/(\d{1,3})(?= to maximum Energy Shield)/);
            regex = new RegExp(/(\d{1,3})(?: to maximum Energy Shield)/);
            break;
        default:
            return (text = "Error")
    }

    const match = regex.test(e.target.value)

    if (match) {
        text = e.target.value.match(regex)[1];
    }
    return parseInt(text);
}

export const getExplicitedIncreased = (e) => {
    let regex;
    let text = 0;

    switch (baseType) {
        case "ES":
          //  regex = new RegExp(/(\d{1,3})(?=% increased Energy Shield)/);
            regex = new RegExp(/(\d{1,3})(?:% increased Energy Shield)/);
            break;
        default:
            return (text = "Error")
    }

    const match = regex.test(e.target.value)

    if (match) {
        text = e.target.value.match(regex)[1];
    }
    return parseInt(text);

}

// New /n regex
// Use /n to parse every line and use a for loop to grab the last attributes

export const parseNewLine = (e) => {
    const match = e.target.value.match(/.*\n/g) || [];
    const numLineBreaks = match.length;
    let dashCounter = 0;
    let affixLineStart = 0;

    // make to regex one for matching string and one for number
    // then add to object

    const regexText = (/[a-zA-Z ]+/); 
    const regexNum = (/[0-9]+/);


   const attrObject = {
       // "maximum es" : 100,
    }

    for(let i = 0; i < numLineBreaks ;i++){
        if(match[i].match(/--------/)){
            dashCounter++;
            if(dashCounter === 5){
                affixLineStart = i;
                // after 5 dashes we get access to item affixes
            }
        }
        
        //Prints Affixes on Any Item. :D
        if(!!affixLineStart && i > affixLineStart){
            //console.log(match[i]);
            const key = match[i].match(regexText)[0].trim();
            const value = parseInt(match[i].match(regexNum)[0]);

            attrObject[key] = value;
        }

        // Input Validation Max Lines
        if(numLineBreaks > 25){
            return;
        }
    }
    console.log(attrObject);
}
