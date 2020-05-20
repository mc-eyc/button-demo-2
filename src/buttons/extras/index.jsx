import React from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { TimelineMax } from "gsap";

import ExtraButton from "./button";
import ExtraLauncher from "./launcher";

const StyledExtraButtons = styled.div`
    position: absolute;
    display: flex;
    height: 24px;
    transform: ${props => props.titleVisible ? "translate(2px, 26px)" : "translate(2px, 2px)"};
`;

export function ExtraButtons({ buttons, theme, titleVisible }) {
    return (
        <StyledExtraButtons theme={theme} titleVisible={titleVisible}>
            <ThemeProvider theme={theme}>
                <ExtraLauncher />
                {buttons.map((button) => (
                    <ExtraButton />
                ))}
            </ThemeProvider>
        </StyledExtraButtons>
    );
}

export default connect(({ title, extraButtons, theme }) => ({
    titleVisible: title.visible,
    buttons: extraButtons,
    theme: theme.button.default,
}))(ExtraButtons);
