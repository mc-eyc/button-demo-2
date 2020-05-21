export default function(
    state = {
        orientation: "horizontal",
        side: "right",
        offset: { top: 0, right: 16, bottom: 16, left: 16 },
        anchor: "bottom",
    },
    action,
) {
    switch (action.type) {
        case "align.setOrientation":
            return {
                ...state,
                orientation: action.orientation,
                // If horizontal, anchor to the bottom. Otherwise, anchor to the appropriate side as
                // we are switching to a vertical orientation.
                anchor: action.orientation === "vertical" ? state.side : "bottom",
            };
        case "align.setSide":
            return {
                ...state,
                side: action.side,
                // If vertical, anchor to the appropriate side too
                anchor: state.orientation === "vertical" ? action.side : state.anchor,
            };
        case "align.setOffset":
            return { ...state, offset: { ...state.offset, ...action.offset } };
        case "align.setAnchor":
            return { ...state, offset: action.anchor };
        default:
            return state;
    }
}
