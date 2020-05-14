import React from "react";
import classNames from "classnames";

import Shadow from "./shadow";

export default function Spinner({ shadow = 0.08, className }) {
    return (
        <>
            {shadow && (
                <g transform="translate(32,32)">
                    <Shadow r="16" opacity={shadow} />
                </g>
            )}
            <path
                className={classNames("decoration", "spinner", className)}
                d="M56.7812 29.6312a1.1815 1.1815 0 0 0 -1.0358 -0.6262h-2.9458A20.7702 20.7702 0 1 0 32.2934 53.0636a2.5874 2.5874 0 1 0 0.0000 -5.1748a15.5953 15.5953 0 1 1 15.2409 -18.8838h-3.2687a1.1815 1.1815 0 0 0 -0.9727 1.8352l5.7380 8.5066a1.1815 1.1815 0 0 0 1.9494 0.0000L56.7104 30.8402A1.1815 1.1815 0 0 0 56.7812 29.6312Z"
            />
        </>
    );
}
