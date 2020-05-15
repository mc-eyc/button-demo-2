import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Title from "./title";
import HUD from "../hud";
import Balances from "./balances";

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

export function Viewport({ titleVisible }) {
    return (
        <StyledViewport className="viewport" titleVisible={titleVisible}>
            {titleVisible && <Title />}
            <HUD />
            <Balances />
        </StyledViewport>
    );
}

export default connect(({ title }) => ({ titleVisible: title.visible }))(Viewport);
