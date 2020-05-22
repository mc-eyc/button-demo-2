import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Title from "./title";
import HUD from "../hud";
import Balances from "./balances";
import Clock from "./clock";
import ExtraButtons from "../buttons/extras";

const StyledViewport = styled.div`
    display: grid;
    grid-template-rows: ${(props) => (props.titleVisible ? "24px" : "")} auto 48px;
    grid-template-areas: ${(props) => (props.titleVisible ? '"title"' : "")} "game" "balances";

    .title {
        grid-area: title;
    }

    .game,
    .hud {
        grid-area: game;
    }

    .balances {
        grid-area: balances;
    }
`;

export function Viewport({ titleVisible, extraButtons, clockEnabled }) {
    return (
        <StyledViewport className="viewport" titleVisible={titleVisible}>
            {titleVisible && <Title />}
            {extraButtons.length ? <ExtraButtons /> : null}
            {clockEnabled && <Clock />}
            <HUD />
            <Balances />
        </StyledViewport>
    );
}

export default connect(({ title, extraButtons, clock }) => ({ titleVisible: title.visible, extraButtons, clockEnabled: clock.enabled }))(Viewport);
