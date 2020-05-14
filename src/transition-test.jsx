import React from "react";
import styled from "styled-components";
import { TimelineMax } from "gsap";
import { Transition } from "react-transition-group";

const StyledButtonContainer = styled.div`
    position: relative;
    width: 64px;
    height: 64px;
`;

const StyledButton = styled.div`
    position: absolute;
    width: 64px;
    height: 64px;
    border-radius: 32px;
    border-width: 5px;
    border-style: dotted;
    box-sizing: border-box;
`;

let enterTween = null;
let exitTween = null;

const onEnter = (key, ModeButton, prevMode, curMode, elem) => {
    console.log(`[${key}#onEnter]`, prevMode, "->", curMode);
    if (enterTween) {
        enterTween.progress(1).kill();
    }
    enterTween = ModeButton.enter(elem, prevMode) || new TimelineMax().fromTo(elem, 0, { opacity: 0, rotate: 0, scale: 1 }, {});
};

const onExit = function(key, ModeButton, prevMode, curMode, elem, done) {
    if (curMode !== key) {
        console.log(`[${key}#onExit]`, prevMode, "->", curMode);
        if (exitTween) {
            exitTween.progress(1).kill();
        }
        exitTween = ModeButton.exit(elem, curMode, done) || new TimelineMax().fromTo(elem, 0, { opacity: 0, rotate: 0, scale: 1 }, {});
    }
};

export default ({ mode = "default" } = {}) => {
    const containerRef = React.useRef(null);
    const [prevMode, setPrevMode] = React.useState(null);
    const [curMode, setCurMode] = React.useState(mode);

    React.useEffect(() => {
        if (curMode !== mode) {
            setPrevMode(curMode);
            setCurMode(mode);
        }
    }, [mode, curMode]);

    return (
        <StyledButtonContainer ref={containerRef}>
            {["default", "spin", "turbo-spin", "auto-spin-selected", "auto-spin", "free-spin"].map((m) => {
                const ModeButton = getButton(m);
                return (
                    <Transition
                        key={m}
                        in={curMode === m}
                        appear={!prevMode && curMode === m}
                        mountOnEnter={true}
                        unmountOnExit={true}
                        onEnter={onEnter.bind(null, m, ModeButton, prevMode, curMode)}
                        addEndListener={onExit.bind(null, m, ModeButton, prevMode, curMode)}>
                        {(state) => {
                            return <ModeButton className={`btn-${m}`} />;
                        }}
                    </Transition>
                );
            })}
        </StyledButtonContainer>
    );
};

const getButton = (btn) => {
    switch (btn) {
        case "spin":
            return SpinButton;
        case "turbo-spin":
            return TurboSpinButton;
        case "auto-spin-selected":
            return AutoSpinSelectedButton;
        case "auto-spin":
            return AutoSpinButton;
        case "free-spin":
            return FreeSpinButton;
        default:
            return DefaultButton;
    }
};

const DefaultButton = styled(StyledButton)`
    background: red;
    border-color: black;
`;

DefaultButton.enter = (element, from) => {
    if (from === "spin") {
        return new TimelineMax().fromTo(element, 1, { opacity: 0, rotate: 0, scale: 0 }, { opacity: 1, scale: 1 });
    } else {
        return new TimelineMax().fromTo(element, 1, { opacity: 0, rotate: 0 }, { y: 0, opacity: 1, scale: 1 });
    }
};

DefaultButton.exit = (element, to, done) => {
    if (to === "spin") {
        return new TimelineMax().to(element, 0, { opacity: 0 }).eventCallback("onComplete", done);
    } else {
        return new TimelineMax()
            .fromTo(element, 1, { rotate: 0 }, { opacity: 0, rotate: 0 })
            .eventCallback("onComplete", done);
    }
};

const SpinButton = styled(StyledButton)`
    background: red;
    border-color: green;
`;

SpinButton.enter = (element, from) => {
    if (from === "default") {
        return new TimelineMax().fromTo(element, 1, { opacity: 1, rotate: 0 }, { opacity: 0, rotate: 360, scale: 0 });
    } else {
      return new TimelineMax().fromTo(element, 0, { opacity: 0, rotate: 360, scale: 0 }, {});
    }
};

SpinButton.exit = DefaultButton.exit;

const TurboSpinButton = styled(StyledButton)`
    background: green;
    border-color: lime;
`;

TurboSpinButton.enter = (element, from) => {
    if (from === "default") {

    }
};

TurboSpinButton.exit = SpinButton.exit;

const AutoSpinSelectedButton = styled(StyledButton)`
    background: gray;
    border-color: cornflowerblue;
`;

AutoSpinSelectedButton.enter = DefaultButton.enter;
AutoSpinSelectedButton.exit = DefaultButton.exit;

const AutoSpinButton = styled(StyledButton)`
    background: black;
    border-color: blue;
`;

AutoSpinButton.enter = DefaultButton.enter;
AutoSpinButton.exit = DefaultButton.exit;

const FreeSpinButton = styled(StyledButton)`
    background: white;
    border-color: black;
`;

FreeSpinButton.enter = DefaultButton.enter;
FreeSpinButton.exit = DefaultButton.exit;
