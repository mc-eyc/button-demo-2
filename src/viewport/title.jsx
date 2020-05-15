import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledTitle = styled.div`
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    font-family: ${(props) => props.theme.fontFamily};
`;

export function Title({ text, theme }) {
    return <StyledTitle className="title" theme={theme}>{text}</StyledTitle>;
}

export default connect(({ title, theme }) => ({ text: title.text, theme: theme.ui }))(Title);
