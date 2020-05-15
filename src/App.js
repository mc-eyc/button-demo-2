import React from "react";
import Menu from "./menu";
import Window from "./window";

export default function App() {
    return (
        <div className="App">
            <Window width={800} height={600} x={window.innerWidth / 2 - 400} y={350} />
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
