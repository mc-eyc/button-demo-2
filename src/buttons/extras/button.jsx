import React, { useContext } from "react";
import { connect } from "react-redux";
import styled, { ThemeContext } from "styled-components";
import { Home } from "./icons";

const StyledExtraButton = styled.svg`
    fill: ${(props) => props.theme.color};
`;

export function ExtraButton({action}) {
    const theme = useContext(ThemeContext);
    return (
        <StyledExtraButton theme={theme} viewBox="0 0 24 24" width="24" height="100%" onClick={action}>
            <Home />
        </StyledExtraButton>
    );
}

export default connect(({extraButtons}, ownProps) => extraButtons.find(button => button.id === ownProps.id))(ExtraButton);