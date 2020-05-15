import React, { useState } from "react";
import { connect } from "react-redux";
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

export function ButtonContainer({ mode, align, className, children }) {
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

    // TODO: When changing orientation or side find way to force new tween with correct prev and cur states

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
                            align,
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
                            align,
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
    align,
    elem,
) => {
    if (enterModes === curMode || enterModes.includes(curMode)) {
        console.log(`[${key}#onEnter]`, prevMode, "->", curMode);
        if (enterTween) {
            enterTween.progress(1).kill();
        }
        setEnterTween(
            ModeButton.enter(elem, align, prevMode, curMode) ||
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
    align,
    elem,
    done,
) {
    if (enterModes !== curMode || !enterModes.includes(curMode)) {
        console.log(`[${key}#onExit]`, prevMode, "->", curMode);
        if (exitTween) {
            exitTween.progress(1).kill();
        }
        setExitTween(
            ModeButton.exit(elem, align, prevMode, curMode, done) ||
                new TimelineMax()
                    .fromTo(elem, 0, { opacity: 0, rotate: 0, scale: 1 }, {})
                    .eventCallback("onComplete", done),
        );
    }
};

export default connect(({mode, align}) => ({ mode, align }))(ButtonContainer);