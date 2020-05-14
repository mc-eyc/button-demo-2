import React from "react";
import styled from "styled-components";
import { TimelineMax, Elastic, Back } from "gsap";

import Button from "./button";
import modes from "../modes";
import Stopper from "./decorations/stopper";

const StyledStopSpin = styled(Button)``;

export default function StopSpin(props) {
    return (
        <StyledStopSpin {...props}>
            <g transform="translate(16, 16)">
                <Stopper />
            </g>
        </StyledStopSpin>
    );
}

StopSpin.enter = (element, from, to) => {
    if (to === modes.SlamSpinning) {
        return new TimelineMax()
            .fromTo(
                element,
                0.5,
                { opacity: 0, rotate: 0, scale: 0, x: 0 },
                { ease: Elastic.easeOut, opacity: 1, scale: 1 },
            )
            .to(element, 0.25, { ease: Back.easeOut, x: "-25%" });
    } else if (to === modes.TurboSpinning) {
        return new TimelineMax()
            .delay(0.5)
            .fromTo(element, 0.25, { x: 0 }, { ease: Back.easeOut, x: "-75%" });
    } else {
        return new TimelineMax().fromTo(element, 0, { opacity: 0, rotate: 360, scale: 0 }, {});
    }
};

StopSpin.exit = (element, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};
