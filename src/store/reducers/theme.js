import _set from "lodash.set";

// Default theme constant - up here for readability
const defaultState = {
    // Generic foreground colour - serves as the fallback for all foreground colours
    color: "white",
    // Body background colour
    background: "rgba(0, 0, 0, 0.95)",
    // Generic font family - serves as the fallback for all font families
    fontFamily: "Open Sans",
    // Button themes
    button: {
        default: {
            color: "white",
            background: "rgba(0, 0, 0, 0.75)",
            border: "white",
        },
        alt: {
            color: "black",
            background: "rgba(255, 255, 255, 0.75)",
            border: "black",
        },
        turbo: {
            background: "linear-gradient(to bottom, #fff25e, #ff6a2a 75%)",
        },
        autoSpin: {
            decoration: "white",
            color: "black",
        },
    },
    // Balance themes
    balance: {
        title: {
            color: "white",
            fontFamily: "Open Sans",
        },
        value: {
            color: "white",
            fontFamily: "Open Sans",
        },
    },
    // Clock
    clock: {
        color: "black",
        fontFamily: "Open Sans",
        fontSize: "0.6em",
        fontWeight: "bold",
    },
    // Border
    border: {
        color: "black",
    },
    // UI
    ui: {
        color: "white",
        background: "black",
        fontFamily: "Open Sans",
    },
    screen: {
        background: "black",
        title: "white",
        text: "white",
        accent: "#46bebc",
        button: {
            color: "white",
            background: "#464646",
        },
    },
};

//
export default function theme(state = defaultState, action) {
    switch (action.type) {
        case "theme.update":
            return Object.assign({}, _set(state, action.prop, action.value));
        default:
            return state;
    }
}
