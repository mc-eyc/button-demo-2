import React from "react";
import styled from "styled-components";
import { TimelineMax } from "gsap";

import Button from "./button";
import Cross from "./decorations/cross";

const StyledClose = styled(Button)``;

export default function Close(props) {
    return (
        <StyledClose {...props}>
            <g transform="translate(16, 28)">
                <Cross />
            </g>
        </StyledClose>
    );
}

Close.enter = (elem, align, from, to) => {
    return new TimelineMax().fromTo(elem, 0.5, { opacity: 0 }, { opacity: 1 });
};

Close.exit = (elem, align, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};
