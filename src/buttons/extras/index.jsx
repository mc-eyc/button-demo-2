import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import ExtraButton from "./button";
import ExtraLauncher from "./launcher";
import ExtraSlider from "./slider";

const StyledExtraButtons = styled.div`
    position: absolute;
    display: flex;
    width: auto;
    height: 24px;
    transform: ${(props) => (props.titleVisible ? "translate(2px, 26px)" : "translate(2px, 2px)")};
    pointer-events: all;
    cursor: pointer;
    user-select: none;

    .container {
        position: absolute;
        border: 1px solid red;
        width: 24px;
        height: 24px;
    }

    .slider-container {
        transform: translate(-24px);
        clip-path: inset(0px -12px 0px 12px);
        width: 100%;
    }
`;

export function ExtraButtons({ buttons, theme, titleVisible }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <StyledExtraButtons theme={theme} titleVisible={titleVisible}>
            <ThemeProvider theme={theme}>
                <ExtraLauncher onClick={setExpanded.bind(null, !expanded)} expanded={expanded} />
                <div className="slider-container">
                    <ExtraSlider expanded={expanded}>
                        {buttons.map((button) => (
                            <ExtraButton key={`extra-button-${button.id}`} id={button.id} />
                        ))}
                    </ExtraSlider>
                </div>
            </ThemeProvider>
        </StyledExtraButtons>
    );
}

export default connect(({ title, extraButtons, theme }) => ({
    titleVisible: title.visible,
    buttons: extraButtons,
    theme: theme.button.default,
}))(ExtraButtons);
