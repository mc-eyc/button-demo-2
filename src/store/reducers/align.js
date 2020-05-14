export default function(
    state = { orientation: "horizontal", side: "right", offset: 0, anchor: "bottom" },
    action,
) {
    switch (action.type) {
        case "align.setOrientation":
            return { ...state, orientation: action.orientation };
        case "align.setSide":
            return { ...state, side: action.side };
        case "align.setOffset":
            return { ...state, offset: action.offset };
        case "align.setAnchor":
            return { ...state, offset: action.anchor };
        default:
            return state;
    }
}
