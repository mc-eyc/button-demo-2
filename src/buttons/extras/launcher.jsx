import React, { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { connect } from "react-redux";

const StyledExtraLauncher = styled.svg`
    width: 24px;
    height: 24px;

    .body {
      fill: ${(props) => props.theme.background};
    }

    .expander {
      fill: ${props => props.theme.color};
      text-align: center;
    }
`;

export default function ExtraLauncher() {
    const [expanded, setExpanded] = useState(false);
    const theme = useContext(ThemeContext);
    return (
        <StyledExtraLauncher theme={theme} viewBox="0 0 24 24">
            <g transform="translate(12, 12)">
                <circle className="body" r="12" />
            </g>
            <g transform="translate(8, 17)">
                <text className="expander">{expanded ? "X" : "+"}</text>
            </g>
        </StyledExtraLauncher>
    );
}
