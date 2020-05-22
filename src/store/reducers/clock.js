export default function(state = { enabled: true, format: "hh:mm", interval: 1000 }, action) {
    switch (action.type) {
        case "clock.setEnabled":
            return { ...state, enabled: action.enabled };
        case "clock.setFormat":
            return { ...state, format: action.format };
        case "clock.setInterval":
            return { ...state, interval: action.interval };
        default:
            return state;
    }
}
