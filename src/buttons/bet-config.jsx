import React from "react";
import styled from "styled-components";
import { TimelineMax } from "gsap";

import Button from "./button";
import Coins from "./decorations/coins";

const StyledBetConfig = styled(Button)``;

export default function BetConfig(props) {
    return (
        <StyledBetConfig {...props}>
            <g transform="translate(4, 6) scale(0.75)">
                <Coins />
            </g>
            :console.warn();
        </StyledBetConfig>
    );
}

BetConfig.enter = (elem, align, from, to) => {
    return new TimelineMax().fromTo(elem, 0.5, { opacity: 0 }, { opacity: 1 });
};

BetConfig.exit = (elem, align, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};
