import React, { useEffect, useState, useContext, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import { TimelineMax, Back } from "gsap";

const StyledExtraSlider = styled.div`
    background: ${props => props.theme.background};
    width: auto;
    height: 24px;
    border-radius: ${props =>
        props.direction === "left" ? "12px 0px 0px 12px" : "0px 12px 12px 0px"};
    transform: translateX(${props => (props.direction === "left" ? "24px" : "-24px")});
    display: flex;
    padding-left: ${props => (props.direction === "left" ? "6px" : "28px")};
    padding-right: ${props => (props.direction === "left" ? "28px" : "6px")};
`;

export default function ExtraSlider({ expanded, direction, children }) {
    const theme = useContext(ThemeContext);
    const [tween, setTween] = useState(null);
    const [prevDirection, setPrevDirection] = useState(direction);
    const ref = useRef(null);

    useEffect(() => {
        if (tween) {
            tween.kill();
        }
        if (ref.current) {
            if (prevDirection === direction) {
                setTween(
                    new TimelineMax().to(ref.current, 0.5, {
                        ease: Back.easeInOut,
                        x: expanded ? "0%" : direction === "left" ? "100%" : "-100%",
                    }),
                );
            } else {
                setTween(
                    new TimelineMax().fromTo(
                        ref.current,
                        0,
                        { x: expanded ? "0%" : direction === "left" ? "100%" : "-100%" },
                        {},
                    ),
                );
                setPrevDirection(direction);
            }
        }
    }, [expanded, ref, direction]);

    return (
        <StyledExtraSlider theme={theme} direction={direction} ref={ref}>
            {children}
        </StyledExtraSlider>
    );
}
