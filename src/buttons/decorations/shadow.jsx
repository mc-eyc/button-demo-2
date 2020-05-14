import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const StyledShadow = styled.circle`
    opacity: ${(props) => props.opacity};
    stroke-width: 8px;

    &.shadow {
        fill: none;
    }
`;

export default function Shadow({ className, r = 16, opacity = 0 }) {
    return (
        <StyledShadow
            opacity={opacity}
            className={classNames("decoration", "shadow", className)}
            r={r}
        />
    );
}
