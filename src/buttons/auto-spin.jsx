import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TimelineMax, Back } from "gsap";

import Button from "./button";
import modes from "../modes";
import Stopper from "./decorations/stopper";

const StyledAutoSpin = styled(Button)``;

export function AutoSpin(props) {
    const { spins } = props;
    return (
        <StyledAutoSpin text={spins > 0 && spins} {...props}>
            <g transform="translate(16, 16)">
                <Stopper />
            </g>
        </StyledAutoSpin>
    );
}

AutoSpin.defaultProps = {
    skin: "autoSpin",
};

AutoSpin.enter = (elem, align, from, to) => {
    if (from === modes.Default || from === modes.AutoSpinSelected) {
        return new TimelineMax().fromTo(
            elem,
            1,
            { opacity: 0, rotate: 0, scale: 0.5 },
            { ease: Back.easeOut, opacity: 1, rotate: 360, scale: 1 },
        );
    } else {
        return new TimelineMax().fromTo(
            elem,
            1,
            { opacity: 0, rotate: 0, scale: 1, y: 32 },
            { ease: Back.easeOut, opacity: 1, y: 0 },
        );
    }
};

AutoSpin.exit = (elem, align, from, to, done) => {
    return new TimelineMax()
        .fromTo(
            elem,
            0.5,
            { opacity: 1, rotate: 0, scale: 1 },
            { ease: Back.easeIn, opacity: 0, scale: 0 },
        )
        .eventCallback("onComplete", done);
};

export default connect(({ counters }) => ({ spins: counters.autoSpins }))(AutoSpin);
