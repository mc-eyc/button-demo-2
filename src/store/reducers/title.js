export default function(state = { text: "GAME TITLE", visible: false }, action) {
    switch (action.type) {
        case "title.setText":
            return { ...state, text: action.text };
        case "title.setVisible":
            return { ...state, visible: action.visible };
        default:
            return state;
    }
}
