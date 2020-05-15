import React from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import Viewport from "../viewport";

const StyledWindow = styled(Rnd)`
    border-radius: 5px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.25);

    > .viewport {
        width: 100%;
        height: 100%;
    }
`;

export default function Window({ width, height, x, y, children }) {
    return (
        <StyledWindow default={{ width, height, x, y }}>
            <Viewport />
        </StyledWindow>
    );
}
