import React from "react";
import styled from "styled-components";
import { TimelineMax, Back } from "gsap";
import { connect } from "react-redux";

import Button from "./button";
import modes from "../modes";
import SpinnerLoop from "./decorations/spinner-loop";

const StyledAutoSpinSelected = styled(Button)`
    .text-1 {
        font-size: 1.5em;
    }

    .text-2 {
        font-size: 1em;
    }

    .text-3 {
        font-size: 0.75em;
    }
`;

export function AutoSpinSelected(props) {
    return (
        <StyledAutoSpinSelected text={props.spins} {...props}>
            <g transform="translate(-6, -6)">
                <SpinnerLoop shadow={0} />
            </g>
        </StyledAutoSpinSelected>
    );
}

AutoSpinSelected.enter = (elem, align, from, to) => {
    return new TimelineMax().fromTo(
        elem,
        0.5,
        { opacity: 0, y: 32 },
        { ease: Back.easeOut, opacity: 1, y: 0 },
    );
};

AutoSpinSelected.exit = (elem, align, from, to, done) => {
    if (to === modes.AutoSpinning) {
        return new TimelineMax()
            .fromTo(elem, 0.5, { opacity: 1 }, { opacity: 0 })
            .eventCallback("onComplete", done);
    } else {
        return new TimelineMax().eventCallback("onComplete", done);
    }
};

export default connect(({ counters }) => ({ spins: counters.autoSpinsSelected }))(AutoSpinSelected);
