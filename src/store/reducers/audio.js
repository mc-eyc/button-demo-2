export default function(state = { volume: 0, mute: false }, action) {
    switch (action.type) {
        case "audio.setVolume":
            return { ...state, volume: Math.min(Math.max(0, action.volume), 1) };
        case "audio.setMute":
            return { ...state, mute: action.mute };
        case "audio.toggleMute":
            return { ...state, mute: !state.mute };
        default:
            return state;
    }
}
