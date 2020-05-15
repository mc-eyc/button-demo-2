import React from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import Balance from "./balance";

const StyledBalances = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto 20% 20% 20% auto;
    grid-template-areas: ". credit win bet .";
    align-items: center;
    justify-items: center;
    justify-content: center;

    background-color: ${(props) => props.theme.background};
`;

export function Balances({ balances, theme, balanceTheme }) {
    return (
        <StyledBalances theme={theme} className="balances">
            <ThemeProvider theme={balanceTheme}>
                {balances.map((balance) => (
                    <Balance key={`balance-${balance.id}`} {...balance} style={{gridArea: balance.id}} />
                ))}
            </ThemeProvider>
        </StyledBalances>
    );
}

export default connect(({ balances, theme }) => ({
    balances,
    theme: theme.ui,
    balanceTheme: theme.balance,
}))(Balances);
