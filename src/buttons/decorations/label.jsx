import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";

const StyledTextPath = styled("textPath")`
    font-size: ${(props) => props.fontSize}px;
    text-align: center;
    letter-spacing: ${(props) => props.fontSize * 0.25}px;
`;

// TODO: Tie this in with TweenMax's timeline speed?

export default function Label({
    className,
    text,
    id: propId,
    fontSize = 10,
    align = "top",
    r = 32,
    rotateSpeed = 0,
}) {
    const [direction, setDirection] = useState(align === "bottom" ? 0 : 1);
    const [id, setId] = useState(propId || `label-path-${align}`);

    useEffect(() => {
      setDirection(align === "bottom" ? 0 : 1);
    }, [align]);

    useEffect(() => {
      setId(propId || `label-path-${align}`);
    }, [propId, align]);

    return (
        <>
            <defs>
                <path id={`label-path-${align}`} d={arc(r, direction, 1)}>
                    {rotateSpeed && (
                        <animateTransform
                            attributeName="transform"
                            begin="0s"
                            dur={`${Math.abs(rotateSpeed) * 0.001}s`}
                            type="rotate"
                            from="0"
                            to={rotateSpeed < 0 ? -360 : 360}
                            repeatCount="indefinite"
                        />
                    )}
                </path>
            </defs>
            <text
                className={classNames("decoration", "label", align, className)}
                dy={direction * fontSize * 0.75}
                textAnchor="middle">
                <StyledTextPath xlinkHref={`#${id}`} fontSize={fontSize} startOffset="50%">
                    {text}
                </StyledTextPath>
            </text>
        </>
    );
}

Label.propTypes = {
    text: PropTypes.string.isRequired,
    align: PropTypes.oneOf(["top", "bottom"]).isRequired,
};

Label.defaultProps = {
    align: "top",
};

const arc = (radius, direction = 1, mod = 1) => {
    const r = radius * mod;
    return `M -${r} 0 A ${r} ${r} 0 0 ${direction} ${r} 0`;
};
