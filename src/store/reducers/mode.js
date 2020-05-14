export default function mode(state = "default", action) {
    switch (action.type) {
        case "mode.set":
            return action.mode || state.mode;
        default:
            return state;
    }
}
