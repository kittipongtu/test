export default (state = "", action) => {
    switch(action.type) {
        case "SET_ROLE":
            return action.payload
        default:
            return state
    }
}
