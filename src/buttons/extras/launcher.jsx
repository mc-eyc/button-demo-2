import React, { useContext, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components";
import { TimelineMax, Back } from "gsap";

import Cross from "../decorations/cross";

const StyledExtraLauncher = styled.svg`
    min-width: 24px;
    min-height: 24px;
    width: 24px;
    height: 24px;
    z-index: 1;

    .body {
        fill: ${(props) => props.theme.background};
    }

    .expander {
        fill: ${(props) => props.theme.color};
    }
`;

export default function ExtraLauncher({ expanded, onClick }) {
    const theme = useContext(ThemeContext);
    const ref = useRef(null);
    const [tween, setTween] = useState(null);

    useEffect(() => {
        if (tween) {
            tween.kill();
        }
        if (ref.current) {
            setTween(
                new TimelineMax().to(ref.current, 0.25, {
                    ease: Back.easeOut,
                    rotation: expanded ? 0 : -45,
                    transformOrigin: "50% 50%",
                }),
            );
        }
    }, [expanded, ref]);

    return (
        <StyledExtraLauncher theme={theme} viewBox="0 0 24 24" onClick={onClick}>
            <g transform="translate(12, 12)">
                <circle className="body" r="12" />
                {/* This is to mimic the underlying slider colour blending */}
                {expanded && <circle r="12" className="body" />}
            </g>
            <g transform="translate(4, 9.5) rotate(45, 8, 2)" ref={ref}>
                <Cross className="expander" width={16} height={4} rounding={1} />
            </g>
        </StyledExtraLauncher>
    );
}

ExtraLauncher.propTypes = {
    expanded: PropTypes.bool.isRequired,
};

ExtraLauncher.defaultProps = {
    expanded: false,
};
