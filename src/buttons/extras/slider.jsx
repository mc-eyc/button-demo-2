import React, { useEffect, useState, useContext, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import { TimelineMax, Back } from "gsap";

const StyledExtraSlider = styled.div`
    background: ${(props) => props.theme.background};
    width: auto;
    height: 24px;
    border-radius: 0px 12px 12px 0px;
    transform: translateX(-24px);
    display: flex;
    padding-left: 32px;
    padding-right: 6px;
`;

export default function ExtraSlider({ expanded, children }) {
    const theme = useContext(ThemeContext);
    const [tween, setTween] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        if (tween) {
            tween.kill();
        }
        if (ref.current) {
            setTween(
                new TimelineMax().to(ref.current, 0.5, {
                    ease: Back.easeInOut,
                    x: expanded ? "0%" : "-100%",
                }),
            );
        }
    }, [expanded, ref]);

    return (
        <StyledExtraSlider theme={theme} ref={ref}>
            {children}
        </StyledExtraSlider>
    );
}
