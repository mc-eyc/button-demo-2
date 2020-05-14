import React from "react";
import classNames from "classnames";

export default function Stopper({ className, size = 32, rounding = 6 }) {
    return (
        <rect
            className={classNames("decoration", "stopper", className)}
            width={size}
            height={size}
            rx={rounding}
            ry={rounding}
        />
    );
}
