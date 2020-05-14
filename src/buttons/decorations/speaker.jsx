import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const StyledWave = styled.path`
  &.decoration {
    fill: none;
    stroke-width: 6px;
  }
`;

export default function Speaker({ className, mute }) {
    return (
        <>
            <polygon
                className={classNames("decoration", "speaker", { mute }, className)}
                points="46.43 39.23 46.43 59 30.28 44.31 20.85 44.31 20.85 39.23 20.85 32.97 30.28 32.97 46.43 18.28 46.43 39.23"
            />
            {!mute && (
                <g transform="translate(10, 2) scale(0.9)">
                    <StyledWave
                        className={classNames("decoration", "speaker", "wave", className)}
                        d="M48,52.16a18.27,18.27,0,0,0,0-27"
                    />
                    <StyledWave
                        className={classNames("decoration", "speaker", "wave", className)}
                        d="M54.49,60a27.44,27.44,0,0,0,0-42.81"
                    />
                </g>
            )}
        </>
    );
}
