import React from "react";
import styled from "styled-components";
import { TimelineMax, Back } from "gsap";
import { connect } from "react-redux";

import Button from "./button";
import modes from "../modes";
import Label from "./decorations/label";

const StyledFreeSpin = styled(Button)`
    .text-1 {
        font-size: 1.5em;
    }

    .text-2 {
        font-size: 1.25em;
    }
`;

export function FreeSpin(props) {
    const { spins } = props;
    return (
        <StyledFreeSpin text={spins > 0 && spins} {...props}>
            <g transform="translate(32, 32)">
                <Label text="FREE" r={28} align="top" rotateSpeed={5000} />
                <Label text="SPINS" r={28} align="bottom" rotateSpeed={5000} />
            </g>
        </StyledFreeSpin>
    );
}

FreeSpin.defaultProps = {
    skin: "alt",
};

FreeSpin.enter = (elem, from, to) => {
    return new TimelineMax().fromTo(
        elem,
        0.5,
        { opacity: 0, rotate: 0, scale: 1, y: -32 },
        { ease: Back.easeOut, opacity: 1, y: 0 },
    );
};

FreeSpin.exit = (elem, from, to, done) => {
    if (to === modes.Spinning || to === modes.TurboSpinning || to === modes.AutoSpinning) {
        return new TimelineMax()
            .fromTo(
                elem,
                0.5,
                { opacity: 1, rotate: 0, scale: 1, y: 0 },
                { ease: Back.easeIn, opacity: 0, y: -32 },
            )
            .eventCallback("onComplete", done);
    } else {
        return new TimelineMax().eventCallback("onComplete", done);
    }
};

export default connect(({ counters }) => ({ spins: counters.freeSpins }))(FreeSpin);
