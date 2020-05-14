import React from "react";
import classNames from "classnames";

export default function Lightning({ className }) {
    return (
        <path
            className={classNames("decoration", "lightning", className)}
            d="M61.2100 45.1900a1.1500 1.1500 0 0 1 1.0800 -0.7900H76.7500a1.1600 1.1600 0 0 1 1.0000 1.6500L71.8900 59.0000a1.1600 1.1600 0 0 0 1.0000 1.6500H83.0000a1.1600 1.1600 0 0 1 0.8500 1.9300L60.0000 91.2100a1.1400 1.1400 0 0 1 -1.9300 -1.1400L64.0000 73.1300a1.1500 1.1500 0 0 0 -1.0800 -1.5200H53.0000a1.1700 1.1700 0 0 1 -1.0800 -1.5300Z"
        />
    );
}
