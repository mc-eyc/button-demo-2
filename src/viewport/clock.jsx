import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import useInterval from "use-interval";
import fecha from "fecha";

const StyledClock = styled.div`
    position: absolute;
    color: ${props => props.theme.color};
    font-family: ${props => props.theme.fontFamily};
    font-size: ${props => props.theme.fontSize};
    font-weight: ${props => props.theme.fontWeight};

    /* Set correct position based on other UI element alignments */
    top: ${props =>
        props.position.includes("top") ? (props.titleVisible ? "26px" : "2px") : "auto"};
    right: ${props => (props.position.includes("right") ? "2px" : "auto")};
    bottom: ${props => (props.position.includes("bottom") ? "48px" : "auto")};
    left: ${props => (props.position.includes("left") ? "2px" : "auto")};
`;

const fmt = (date, format) => fecha.format(date, format);

const getPosition = (orientation, side) => {
    if (orientation === "vertical") {
        return side === "left" ? "bottom-right" : "bottom-left";
    } else {
        return "top-right";
    }
};

export function Clock({ enabled, format, interval, theme, titleVisible, align }) {
    const [position, setPosition] = useState(getPosition(align.orientation, align.side));
    const [date, setDate] = useState(new Date());

    useInterval(() => {
        setDate(new Date());
    }, interval);

    useEffect(() => {
        setPosition(getPosition(align.orientation, align.side));
    }, [align.orientation, align.side]);

    return (
        <StyledClock theme={theme} titleVisible={titleVisible} position={position}>
            {fmt(date, format)}
        </StyledClock>
    );
}

export default connect(({ clock, theme, title, align }) => ({
    ...clock,
    theme: theme.clock,
    titleVisible: title.visible,
    align,
}))(Clock);
