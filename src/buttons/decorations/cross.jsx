import React from "react";
import classNames from "classnames";

export default function Cross({ className, width = 32, height = 8, rounding=4 }) {
    return (
        <>
            <rect
                className={classNames("decoration", "cross", className)}
                width={width}
                height={height}
                transform={`rotate(45, ${width/2}, ${height/2})`}
                rx={rounding}
            />
            <rect
                className={classNames("decoration", "cross", className)}
                width={width}
                height={height}
                transform={`rotate(-45, ${width/2}, ${height/2})`}
                ry={rounding}
            />
        </>
    );
}
