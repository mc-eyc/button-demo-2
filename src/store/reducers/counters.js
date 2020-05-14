export default function(state = { autoSpins: 0, autoSpinsSelected: 0, freeSpins: 0 }, action) {
    switch (action.type) {
        case "counters.setAutoSpins":
            return { ...state, autoSpins: action.value };
        case "counters.setAutoSpinsSelected":
            return { ...state, autoSpinsSelected: action.value };
        case "counters.setFreeSpins":
            return { ...state, freeSpins: action.value };
        case "counters.reset":
            return Object.keys(state).reduce((cur, prev) => ({ ...prev, [cur]: 0 }), {});
        default:
            return state;
    }
}
