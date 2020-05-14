import React from "react";

import HUD from "./hud";
import Menu from "./menu";

export default function App() {
    return (
        <div className="App">
            <HUD />
            <Menu
                modes={[
                    "default",
                    "spinning",
                    "turbo-spinning",
                    "auto-spin-pre-selection",
                    "auto-spin-selected",
                    "auto-spinning",
                    "free-spinning",
                ]}
            />
        </div>
    );
}
