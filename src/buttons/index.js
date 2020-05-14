import React, { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { Transition } from "react-transition-group";
import { TimelineMax } from "gsap";

const StyledButtonContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

export default function ButtonContainer({ mode = "default", className, children }) {
    const [prevMode, setPrevMode] = useState(null);
    const [curMode, setCurMode] = useState(mode);
    const [enterTween, setEnterTween] = useState(null);
    const [exitTween, setExitTween] = useState(null);

    React.useEffect(() => {
        if (curMode !== mode) {
            setPrevMode(curMode);
            setCurMode(mode);
        }
    }, [mode, curMode]);

    return (
        <StyledButtonContainer className={classNames(className, "button-container")}>
            {/* Render all child buttons as transitions, for some reason React.Children.map isn't working */}
            {children && [].concat(children).map((child) => {
                const originalComponent = child.type?.WrappedComponent || child.type;
                const name = originalComponent.name;
                const active =
                    child.props.on instanceof Array
                        ? child.props.on.includes(curMode)
                        : child.props.on === curMode;
                return (
                    <Transition
                        key={`trans-${name}`}
                        in={active}
                        appear={!prevMode && active}
                        mountOnEnter={true}
                        unmountOnExit={true}
                        onEnter={ButtonContainer.onEnter.bind(
                            null,
                            name,
                            child.props.on || [],
                            enterTween,
                            setEnterTween,
                            originalComponent,
                            prevMode,
                            curMode,
                        )}
                        addEndListener={ButtonContainer.onExit.bind(
                            null,
                            name,
                            child.props.on || [],
                            exitTween,
                            setExitTween,
                            originalComponent,
                            prevMode,
                            curMode,
                        )}>
                        {{ ...child, key: `btn-${name}` }}
                    </Transition>
                );
            })}
        </StyledButtonContainer>
    );
}

ButtonContainer.onEnter = (
    key,
    enterModes,
    enterTween,
    setEnterTween,
    ModeButton,
    prevMode,
    curMode,
    elem,
) => {
    if (enterModes === curMode || enterModes.includes(curMode)) {
        console.log(`[${key}#onEnter]`, prevMode, "->", curMode);
        if (enterTween) {
            enterTween.progress(1).kill();
        }
        setEnterTween(
            ModeButton.enter(elem, prevMode, curMode) ||
                new TimelineMax().fromTo(elem, 0, { opacity: 0, rotate: 0, scale: 1 }, {}),
        );
    }
};

ButtonContainer.onExit = function(
    key,
    enterModes,
    exitTween,
    setExitTween,
    ModeButton,
    prevMode,
    curMode,
    elem,
    done,
) {
    if (enterModes !== curMode || !enterModes.includes(curMode)) {
        console.log(`[${key}#onExit]`, prevMode, "->", curMode);
        if (exitTween) {
            exitTween.progress(1).kill();
        }
        setExitTween(
            ModeButton.exit(elem, prevMode, curMode, done) ||
                new TimelineMax()
                    .fromTo(elem, 0, { opacity: 0, rotate: 0, scale: 1 }, {})
                    .eventCallback("onComplete", done),
        );
    }
};
