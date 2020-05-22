import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import ExtraButton from "./button";
import ExtraLauncher from "./launcher";
import ExtraSlider from "./slider";

const StyledExtraButtons = styled.div`
    position: absolute;
    right: ${props => (props.direction === "left" ? "0px" : "auto")};
    display: flex;
    width: auto;
    height: 24px;
    transform: ${props => (props.direction === "left" ? "translateX(calc(100% - 26px))" : "translateX(2px)")} ${props => (props.titleVisible ? "translateY(26px)" : "translateY(2px)")};
    pointer-events: all;
    cursor: pointer;
    user-select: none;

    .slider-container {
        transform: translate(${props => (props.direction === "left" ? "-100%" : "-24px")});
        clip-path: ${props =>
            props.direction === "left" ? "inset(0 12px 0px -12px)" : "inset(0px -12px 0px 12px)"};
        width: 100%;
    }
`;

const getDirection = (orientation, side) => {
    return orientation === "vertical" && side === "left" ? "left" : "right";
};

export function ExtraButtons({ buttons, theme, titleVisible, align }) {
    const [expanded, setExpanded] = useState(false);

    // The expansion direction defaults to the right of the launcher, however it needs to also support the other direction.
    const [direction, setDirection] = useState(getDirection(align.orientation, align.side));

    useEffect(() => {
        setDirection(getDirection(align.orientation, align.side));
    }, [align.orientation, align.side]);

    return (
        <StyledExtraButtons
            theme={theme}
            titleVisible={titleVisible}
            align={align}
            direction={direction}>
            <ThemeProvider theme={theme}>
                <ExtraLauncher
                    onClick={setExpanded.bind(null, !expanded)}
                    expanded={expanded}
                    direction={direction}
                />
                <div className="slider-container">
                    <ExtraSlider expanded={expanded} direction={direction}>
                        {buttons.map(button => (
                            <ExtraButton key={`extra-button-${button.id}`} id={button.id} />
                        ))}
                    </ExtraSlider>
                </div>
            </ThemeProvider>
        </StyledExtraButtons>
    );
}

export default connect(({ title, extraButtons, theme, align }) => ({
    titleVisible: title.visible,
    buttons: extraButtons,
    theme: theme.button.default,
    align,
}))(ExtraButtons);
