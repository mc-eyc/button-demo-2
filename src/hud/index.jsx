import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { css, ThemeProvider } from "styled-components";
import useResizeObserver from "use-resize-observer";

import modes from "../modes";
import ExtraButtons from "../buttons/extras";
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

const GridHUDHorizontal = css`
    /* Horizontal only allows bottom anchor point */
    grid-template-rows: 32px auto 64px;
    grid-template-columns:
        auto minmax(38px, 64px) minmax(38px, 64px) minmax(64px, 96px) minmax(38px, 64px)
        minmax(38px, 64px) auto;
    grid-template-areas: "extra extra extra extra extra extra extra" ". . . . . . ." ". side0 side1 main side2 side3 .";
`;

const GridHUDVertical = css`
    grid-template-columns: ${(props) => (props.side === "left" ? "96px auto" : "auto 96px")};
    /* TODO: 1fr if under a certain height otherwise 64px if over that height, otherwise they don't shrink / grow properly */
    grid-template-rows:
        auto minmax(${(props) => (props.height > 352 ? "38px" : "1fr")}, 64px)
        minmax(38px, 64px) minmax(64px, 96px) minmax(38px, 64px)
        minmax(38px, 64px) auto;
    grid-template-areas: ${(props) =>
        props.side === "left"
            ? `"." "side0" "side1" "main" "side2" "side3" "."`
            : `". ." ". side0" ". side1" ". main" ". side2" ". side3" ". ."`};
`;

// If the offset value is a number then convert it to pixels otherwise leave as string
const safeOffset = (v) => (typeof v === "number" ? `${v}px` : v);

const padding = css`
    padding-top: 0px;
    padding-right: ${(props) =>
        props.anchor === "right" ? safeOffset(props.offset.right) : "0px"};
    padding-left: ${(props) => (props.anchor === "left" ? safeOffset(props.offset.left) : "0px")};

    > .button-group {
        padding-bottom: ${(props) =>
            props.anchor === "bottom" ? safeOffset(props.offset.bottom) : "0px"};
    }
`;

const StyledHUD = styled.div`
    /* Common grid properties */
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    justify-items: center;

    /* Choose the appropriate grid HUD orientation */
    ${(props) => (props.orientation === "vertical" ? GridHUDVertical : GridHUDHorizontal)}

    /* Padding by anchor and offset - match the anchor to the offset */
    ${padding}

    .button-group {
        width: 38px;
        height: 38px;

        &.main {
            width: 64px;
            height: 64px;
        }

        &.side0 {
            grid-area: side0;
        }

        &.side1 {
            grid-area: side1;
        }

        &.slide, &.main {
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

                {/* Optional Side Buttons */}
                <div className="button-group slide">
                    <ButtonContainer mode={mode}>
                        <TurboSpin on={modes.SlamSpinning} onClick={turboSpin} />
                        <StopSpin on={modes.TurboSpinning} onClick={goToDefault} />
                    </ButtonContainer>
                </div>

                {/* Spin Button */}
                <div className="button-group main">
                    <ButtonContainer mode={mode}>
                        <Spin
                            onClick={spin}
                            on={[modes.Default, modes.AutoSpinPreSelection, modes.BetConfiguring]}
                        />
                        <StopSpin on={modes.SlamSpinning} onClick={goToDefault} />
                        <TurboSpin on={modes.TurboSpinning} />
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
    (dispatch) => ({
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
