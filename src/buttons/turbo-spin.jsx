import React from "react";
import styled from "styled-components";
import { TimelineMax, Elastic, Back } from "gsap";

import Button from "./button";
import modes from "../modes";
import Lightning from "./decorations/lightning";
import Spinner from "./decorations/spinner";

const StyledTurboSpin = styled(Button)``;

export default function TurboSpin(props) {
    return (
        <StyledTurboSpin {...props}>
            <Spinner shadow={0.25} />
            <g transform="translate(5, 4) scale(0.4)">
                <Lightning />
            </g>
        </StyledTurboSpin>
    );
}

TurboSpin.defaultProps = {
    skin: "turbo",
};

TurboSpin.enter = (element, align, from, to) => {
    if (to === modes.TurboSpinning) {
        return new TimelineMax().fromTo(
            element,
            0.5,
            { opacity: 0, rotate: 0, scale: 0 },
            { ease: Elastic.easeOut, opacity: 1, scale: 1 },
        );
    } else {
        return new TimelineMax().fromTo(element, 0, { opacity: 0, rotate: 360, scale: 0 }, {});
    }
};

TurboSpin.exit = (element, align, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};
