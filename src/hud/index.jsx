import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { css, ThemeProvider } from "styled-components";
import useResizeObserver from "use-resize-observer";

import modes from "../modes";
import ButtonContainer from "../buttons";
import Spin from "../buttons/spin";
import TurboSpin from "../buttons/turbo-spin";
import AutoSpinSelected from "../buttons/auto-spin-selected";
import AutoSpin from "../buttons/auto-spin";
import FreeSpin from "../buttons/free-spin";
import Close from "../buttons/close";
import Menu from "../buttons/menu";
import AutoSpinConfig from "../buttons/auto-spin-config";
import BetConfig from "../buttons/bet-config";
import SoundConfig from "../buttons/sound-config";
import StopSpin from "../buttons/stop-spin";
import Stopper from "../buttons/decorations/stopper";
import Lightning from "../buttons/decorations/lightning";

const GridHUDHorizontal = css`
    /* Horizontal only allows bottom anchor point */
    grid-template-rows: auto 64px;
    grid-template-columns:
        auto minmax(38px, 64px) minmax(38px, 64px) minmax(64px, 96px) minmax(38px, 64px)
        minmax(38px, 64px) auto;
    grid-template-areas: ". . . . . . ." ". side0 side1 main side2 side3 .";
`;

const GridHUDVertical = css`
    grid-template-columns: ${props =>
        props.side === "left" ? "64px auto" : "auto minmax(8px, 64px)"};
    grid-template-rows:
        auto minmax(8px, 64px)
        minmax(8px, 64px) minmax(13.5px, 96px) minmax(8px, 64px)
        minmax(8px, 64px) auto;
    grid-template-areas: ${props =>
        props.side === "left"
            ? `"." "side0" "side1" "main" "side2" "side3" "."`
            : `". ." ". side0" ". side1" ". main" ". side2" ". side3" ". ."`};
`;

// If the offset value is a number then convert it to pixels otherwise leave as string
const safeOffset = v => (typeof v === "number" ? `${v}px` : v);

const StyledHUD = styled.div`
    /* Common grid properties */
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    overflow: hidden;

    /* Choose the appropriate grid HUD orientation */
    ${props => (props.orientation === "vertical" ? GridHUDVertical : GridHUDHorizontal)}

    > .button-group {
        /* Margin by anchor and offset - match the anchor to the offset */
        margin-top: ${props => (props.anchor === "top" ? safeOffset(props.offset.top) : "0px")};
        margin-right: ${props =>
            props.anchor === "right" ? safeOffset(props.offset.right) : "0px"};
        margin-bottom: ${props =>
            props.anchor === "bottom" ? safeOffset(props.offset.bottom) : "0px"};
        margin-left: ${props => (props.anchor === "left" ? safeOffset(props.offset.left) : "0px")};

        max-width: 38px;
        max-height: 38px;
        width: 100%;
        height: 100%;

        &.main {
            max-width: 64px;
            max-height: 64px;
        }

        &.side0 {
            grid-area: side0;
        }

        &.side1 {
            grid-area: side1;
        }

        &.slide,
        &.main {
            grid-area: main;
        }

        &.side2 {
            grid-area: side2;
        }

        &.side3 {
            grid-area: side3;
        }
    }
`;

export function HUD({
    mode = "default",
    align,
    theme,
    toggleMute,
    goToDefault,
    goToAutoSpinConfig,
    goToBetConfig,
    goToMenu,
    spin,
    autoSpin,
    turboSpin,
}) {
    // When resizing, update the HUD height to reflect whether or not the grid should expand to a maximum
    // size or contract accordingly as small as possible.
    const [hudHeight, setHudHeight] = useState(0);
    const { ref } = useResizeObserver({
        onResize: ({ height }) => {
            setHudHeight(height);
        },
    });

    return (
        <StyledHUD
            className="hud"
            orientation={align.orientation}
            side={align.side}
            anchor={align.anchor}
            offset={align.offset}
            height={hudHeight}
            ref={ref}>
            {/* Button Theme(s) */}
            <ThemeProvider theme={theme.button}>
                {/* Audio Button */}
                <div className="button-group side0">
                    <ButtonContainer mode={mode}>
                        <SoundConfig
                            onClick={toggleMute}
                            on={[
                                modes.Default,
                                modes.AutoSpinPreSelection,
                                modes.AutoSpinSelected,
                                modes.BetConfiguring,
                            ]}
                        />
                    </ButtonContainer>
                </div>

                {/* Autoplay Config Button */}
                <div className="button-group side1">
                    <ButtonContainer mode={mode}>
                        <AutoSpinConfig
                            onClick={goToAutoSpinConfig}
                            on={[modes.Default, modes.BetConfiguring]}
                        />
                        <Close
                            onClick={goToDefault}
                            on={[modes.AutoSpinPreSelection, modes.AutoSpinSelected]}
                        />
                    </ButtonContainer>
                </div>

                {/* Spin Button */}
                <div className="button-group main">
                    <ButtonContainer mode={mode}>
                        <Spin
                            onClick={spin}
                            on={[modes.Default, modes.AutoSpinPreSelection, modes.BetConfiguring]}
                        />
                        <StopSpin on={modes.SlamSpinning} onClick={goToDefault} wing={Lightning} />
                        <TurboSpin on={modes.TurboSpinning} wing={Stopper} />
                        <AutoSpinSelected onClick={autoSpin} on={modes.AutoSpinSelected} />
                        <AutoSpin on={modes.AutoSpinning} onClick={goToDefault} />
                        <FreeSpin on={modes.FreeSpinning} />
                    </ButtonContainer>
                </div>

                {/* Bet Config Button */}
                <div className="button-group side2">
                    <ButtonContainer mode={mode}>
                        <BetConfig
                            onClick={goToBetConfig}
                            on={[modes.Default, modes.AutoSpinPreSelection, modes.AutoSpinSelected]}
                        />
                        <Close onClick={goToDefault} on={modes.BetConfiguring} />
                    </ButtonContainer>
                </div>

                {/* Menu Button */}
                <div className="button-group side3">
                    <ButtonContainer mode={mode}>
                        <Menu
                            onClick={goToMenu}
                            on={[
                                modes.Default,
                                modes.AutoSpinPreSelection,
                                modes.AutoSpinSelected,
                                modes.BetConfiguring,
                            ]}
                        />
                        <Close onClick={goToDefault} on={modes.MenuOpened} />
                    </ButtonContainer>
                </div>
            </ThemeProvider>
        </StyledHUD>
    );
}

export default connect(
    ({ mode, align, theme }) => ({ mode, align, theme }),
    dispatch => ({
        toggleMute: () => dispatch({ type: "audio.toggleMute" }),
        goToDefault: () => dispatch({ type: "mode.set", mode: modes.Default }),
        goToAutoSpinConfig: () => dispatch({ type: "mode.set", mode: modes.AutoSpinPreSelection }),
        goToBetConfig: () => dispatch({ type: "mode.set", mode: modes.BetConfiguring }),
        goToMenu: () => dispatch({ type: "mode.set", mode: modes.MenuOpened }),
        spin: () => dispatch({ type: "mode.set", mode: modes.Spinning }),
        autoSpin: () => dispatch({ type: "mode.set", mode: modes.AutoSpinning }),
        turboSpin: () => dispatch({ type: "mode.set", mode: modes.TurboSpinning }),
    }),
)(HUD);
