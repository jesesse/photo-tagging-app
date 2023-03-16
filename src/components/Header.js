import React from "react";
import styled from "styled-components";

function Header({timer, isTimerOn}) {

  return (
    <StyledHeader className="header">
       {isTimerOn && <span> {("0" + Math.floor(timer / 60) % 60).slice(-2)}:</span> }
       {isTimerOn && <span> {("0" + timer % 60).slice(-2)} </span> }
    </StyledHeader>
  );
}

const StyledHeader = styled.div`

  background-color: rgba(199, 158, 199, 0.7);
  border: 1px solid black;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  position: sticky;
  top: 0;
  z-index: 1000;
`

export default Header;
