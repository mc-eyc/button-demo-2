import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const StyledBalance = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 45% auto;
  grid-template-areas: "title" "value";
  align-items: center;
  justify-content: center;
  justify-items: center;

  /* ALL-CAPS ALL THE TIME */
  text-transform: uppercase;

  .title {
    grid-area: title;
    color: ${props => props.theme.title.color};
    font-family: ${props => props.theme.title.fontFamily};
    font-weight: bold;
  }

  .value {
    grid-area: value;
    color: ${props => props.theme.value.color};
    font-family: ${props => props.theme.value.fontFamily};
  }
`;

export default function Balance({ title, value, style = {} }) {
    const theme = useContext(ThemeContext);
    return (
        <StyledBalance theme={theme} style={style}>
            <div className="title">{title}</div>
            <div className="value">{value}</div>
        </StyledBalance>
    );
}