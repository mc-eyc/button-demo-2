import React from "react";
import styled from "styled-components";
import { TimelineMax, Back } from "gsap";

import Button from "./button";
import modes from "../modes";
import Spinner from "./decorations/spinner";

const StyledSpin = styled(Button)`
`;

export default function Spin(props) {
    return <StyledSpin {...props}><Spinner /></StyledSpin>;
}

Spin.enter = (element, from, to) => {
    if (!from) {
        return new TimelineMax().fromTo(element, 0, { opacity: 1, rotate: 0, scale: 1 }, {});
    } else if (
        from === modes.Spinning ||
        from === modes.TurboSpinning ||
        from === modes.AutoSpinning ||
        from === modes.FreeSpinning ||
        to === modes.BetConfiguring ||
        to === modes.AutoSpinPreSelection ||
        to === modes.Default
    ) {
        return new TimelineMax().fromTo(
            element,
            0.5,
            { opacity: 0, rotate: 0, scale: 0 },
            { ease: Back.easeOut, opacity: 1, scale: 1 },
        );
    } else {
        return new TimelineMax().fromTo(element, 0, { opacity: 0, rotate: 360, scale: 0 }, {});
    }
};

Spin.exit = (element, from, to, done) => {
    if (to === modes.Spinning) {
        return new TimelineMax()
            .fromTo(
                element,
                0.4,
                { opacity: 1, scale: 1, rotate: 0 },
                { ease: Back.easeIn, opacity: 0, scale: 0, rotate: 360 },
            )
            .eventCallback("onComplete", done);
    } else if (to === modes.TurboSpinning) {
        return new TimelineMax()
            .fromTo(
                element,
                0.5,
                { opacity: 1, rotate: 0, scale: 1 },
                { ease: Back.easeInOut, opacity: 0, rotate: 360, scale: 0.5 },
            )
            .eventCallback("onComplete", done);
    } else {
        return new TimelineMax().eventCallback("onComplete", done);
    }
};
