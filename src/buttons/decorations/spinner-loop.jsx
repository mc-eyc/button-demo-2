import React from "react";
import classNames from "classnames";

import Shadow from "./shadow";

export default function SpinnerLoop({ shadow = 0.08, className }) {
    return (
        <>
            {shadow && (
                <g transform="translate(38,38)">
                    <Shadow opacity={shadow} />
                </g>
            )}
            <path
                className={classNames("decoration", "spinner-loop", "top", className)}
                d="M63.2795 34.3520a1.2340 1.2340 0 0 0 -1.0932 -0.6542H59.5445A21.8965 21.8965 0 0 0 21.7226 23.5528a2.4845 2.4845 0 0 0 3.7184 3.3126a16.9193 16.9193 0 0 1 28.9855 6.8489H51.4203A1.2340 1.2340 0 0 0 50.3934 35.6108l5.3830 7.9752a1.2257 1.2257 0 0 0 2.0538 0.0000L63.2133 35.6108A1.2422 1.2422 0 0 0 63.2795 34.3520Z"
            />
            <path
                className={classNames("decoration", "spinner-loop", "bottom", className)}
                d="M54.1615 49.2754a2.4845 2.4845 0 0 0 -3.5114 0.1739a16.9193 16.9193 0 0 1 -28.8861 -6.9482h2.7578A1.2422 1.2422 0 0 0 25.5487 40.5797l-5.3830 -7.9752a1.2919 1.2919 0 0 0 -2.0621 0.0000L12.7288 40.5797a1.2422 1.2422 0 0 0 1.0269 1.9379H16.6460A21.8965 21.8965 0 0 0 54.3354 52.7867A2.4845 2.4845 0 0 0 54.1615 49.2754Z"
            />
        </>
    );
}
