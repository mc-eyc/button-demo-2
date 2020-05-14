import React from "react";
import { connect } from "react-redux";
import styled, { css, ThemeProvider } from "styled-components";

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

const GridHUDHorizontal = css`
    grid-template-rows: 64px;
    grid-template-columns:
        auto minmax(38px, 64px) minmax(38px, 64px) minmax(64px, 96px) minmax(38px, 64px)
        minmax(38px, 64px) auto;
    grid-template-areas: ". side0 side1 main side2 side3 .";
`;

const GridHUDVertical = css`
    grid-template-columns: ${(props) => (props.side === "left" ? "96px auto" : "auto 96px")};
    grid-template-rows:
        auto minmax(38px, 64px) minmax(38px, 64px) minmax(64px, 96px) minmax(38px, 64px)
        minmax(38px, 64px) auto;
    grid-template-areas: ${(props) =>
        props.side === "left"
            ? `"." "side0" "side1" "main" "side2" "side3" "."`
            : `"." ". side0" ". side1" ". main" ". side2" ". side3" "."`};
`;

const StyledHUD = styled.div`
    /* Common grid properties */
    display: grid;
    align-items: center;

    /* Choose the appropriate grid HUD orientation */
    ${(props) => (props.orientation === "vertical" ? GridHUDVertical : GridHUDHorizontal)}

    margin: 3em 0em;
    border: 1px solid blue;

    .button-group {
        min-width: 38px;
        min-height: 38px;
        width: 38px;
        height: 38px;

        &.main {
            min-width: 64px;
            min-height: 64px;
            width: 64px;
            height: 64px;
        }

        &:nth-child(1) {
            grid-area: side0;
        }

        &:nth-child(2) {
            grid-area: side1;
        }

        &:nth-child(3),
        &:nth-child(4) {
            grid-area: main;
        }

        &:nth-child(5) {
            grid-area: side2;
        }

        &:nth-child(6) {
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
    return (
        <StyledHUD orientation={align.orientation} side={align.side}>
            {/* Button Theme(s) */}
            <ThemeProvider theme={theme.button}>
                {/* Audio Button */}
                <div className="button-group">
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
                <div className="button-group">
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

                {/* Optional Extra Button */}
                <div className="button-group side">
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
                        <AutoSpin on={modes.AutoSpinning} />
                        <FreeSpin on={modes.FreeSpinning} />
                    </ButtonContainer>
                </div>

                {/* Bet Config Button */}
                <div className="button-group">
                    <ButtonContainer mode={mode}>
                        <BetConfig
                            onClick={goToBetConfig}
                            on={[modes.Default, modes.AutoSpinPreSelection, modes.AutoSpinSelected]}
                        />
                        <Close onClick={goToDefault} on={modes.BetConfiguring} />
                    </ButtonContainer>
                </div>

                {/* Menu Button */}
                <div className="button-group">
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
