const armorTypeReducer = (state, action) => {
    switch(action.type){
        case "ES":
            return 
        case "AR":
            return state.filter((note) => (note.title !== action.title))
        case "EV":
            return [...state, {title: action.title, body: action.body}]
        default:
            return state
    }
}


export { notesReducer as default }