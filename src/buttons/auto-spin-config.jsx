import React from "react";
import styled from "styled-components";
import { TimelineMax } from "gsap";

import Button from "./button";
import SpinnerLoop from "./decorations/spinner-loop";

const StyledAutoSpinConfig = styled(Button)``;

export default function AutoSpinConfig(props) {
    return (
        <StyledAutoSpinConfig {...props}>
            <g transform="translate(2,2) scale(0.8)">
            <SpinnerLoop />
            </g>
        </StyledAutoSpinConfig>
    );
}

AutoSpinConfig.enter = (elem, from, to) => {
    return new TimelineMax().fromTo(elem, 0.5, { opacity: 0 }, { opacity: 1 });
};

AutoSpinConfig.exit = (elem, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};
