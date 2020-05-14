import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components";
import classNames from "classnames";
import useDeepCompareEffect from "use-deep-compare-effect";

import utils from "../utils";

const StyledButton = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    user-select: none;
    pointer-events: none;

    .body {
        // The body encompasses the *actual* clickable area we want
        pointer-events: all;
        // Fill with a gradient if appropriate
        fill: ${(props) =>
            props.theme.background.includes("gradient")
                ? "url(#button-body-gradient)"
                : props.theme.background};
    }

    .border {
        stroke: ${(props) => props.theme.border};
        stroke-width: 3px;
        fill: none;
    }

    .decoration {
        fill: ${(props) => props.theme.decoration || props.theme.color};
        stroke: ${(props) => props.theme.decoration || props.theme.color};
    }

    .text {
        text-rendering: optimizeLegibility;
        fill: ${(props) => props.theme.color};
        font-weight: 700;
        text-align: center;
    }
`;

export default function Button({ text, skin, onClick, enabled, className, children }) {
    // Extract the theme from the ThemeProvider, this couples to implementations with a theme and theme provider
    const buttonThemes = useContext(ThemeContext);

    // The theme is the default button theme extended by the specific skin
    const [theme, setTheme] = useState({ ...buttonThemes.default, ...buttonThemes[skin] });

    // Should the skin, default theme, or skin theme ever change then recalculate the theme. This is a deep compare
    // due to the complex nature of the theme objects.
    useDeepCompareEffect(() => {
        setTheme({
            ...buttonThemes.default,
            ...buttonThemes[skin],
        });
    }, [skin, buttonThemes.default, buttonThemes[skin]]);

    // Whether or not there is text to render, this should probably be a reducer but it's only because
    // we may want to render potentially falsy values like 0
    const [hasText, setHasText] = useState(false);

    useEffect(() => {
        setHasText(text !== null && typeof text !== "undefined");
    }, [text]);

    // TODO: Support aria names?
    return (
        <StyledButton className={classNames(className, "button")} theme={theme} onClick={onClick}>
            <svg viewBox="0 0 64 64" width="100%" height="100%">
                <ButtonDefs theme={theme} />
                <ButtonBody />
                {children}
                {hasText && <ButtonText text={text} />}
            </svg>
        </StyledButton>
    );
}

Button.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    onClick: PropTypes.func,
    enabled: PropTypes.bool.isRequired,
    on: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    align: PropTypes.oneOf(["top", "right", "bottom", "left", "center"]),
    skin: PropTypes.string.isRequired,
};

Button.defaultProps = {
    enabled: true,
    on: [],
    align: "center",
    skin: "default",
};

function ButtonDefs({ theme }) {
    const [gradient, setGradient] = useState(null);

    // Generate an appropriate background if there is a gradient
    useEffect(() => {
        theme.background.includes("gradient") &&
            setGradient(utils.css2svgGradient(theme.background, "button-body-gradient"));
    }, [theme]);

    return <defs dangerouslySetInnerHTML={{ __html: gradient }} />;
}

function ButtonBody() {
    return (
        <g transform="translate(32, 32)">
            <circle className="body" r="32" />
            <circle className="border" r="30.5" />
        </g>
    );
}

function ButtonText({ text }) {
    return (
        <g transform="translate(32, 32)">
            <text
                className={classNames("text", `text-${text.length}`)}
                textAnchor="middle"
                alignmentBaseline="central">
                {text}
            </text>
        </g>
    );
}

ButtonText.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.bool]),
};
