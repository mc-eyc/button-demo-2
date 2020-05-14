import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TimelineMax } from "gsap";

import Button from "./button";
import Speaker from "./decorations/speaker";

const StyledSoundConfig = styled(Button)``;

export function SoundConfig(props) {
    return (
        <StyledSoundConfig {...props}>
            <g transform={`translate(${props.mute ? 2 : -6 }, 1) scale(0.8)`}>
                <Speaker mute={props.mute} />
            </g>
        </StyledSoundConfig>
    );
}

SoundConfig.enter = (elem, from, to) => {
    return new TimelineMax().fromTo(elem, 0.5, { opacity: 0 }, { opacity: 1 });
};

SoundConfig.exit = (elem, from, to, done) => {
    return new TimelineMax().eventCallback("onComplete", done);
};

export default connect(({ audio }) => ({ mute: audio.mute }))(SoundConfig);
