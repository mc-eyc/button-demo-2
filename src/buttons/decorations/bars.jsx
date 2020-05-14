import React from "react";
import classNames from "classnames";

export default function Bars({ className, count = 3, width = 32, height = 16, offset = 8, rounding=2 }) {
    return (
        <>
            {new Array(count).fill(null).map((_, i) => (
                <rect
                    key={`bar-${i}`}
                    className={classNames("decoration", "bar", className)}
                    width={width}
                    height={height}
                    transform={`translate(0, ${i * (height + offset)})`}
                    rx={rounding}
                    ry={rounding}
                />
            ))}
        </>
    );
}
