export default function(state = [], action) {
    switch (action.type) {
        case "extraButtons.insert":
            return [
                ...state.slice(0, action.at ?? state.length),
                { id: action.id, icon: action.icon ?? action.id, action: action.action },
                ...state.slice(action.at ?? state.length),
            ];
        case "extraButtons.remove":
            return state.filter((button) => button.id !== action.id);
        default:
            return state;
    }
}
