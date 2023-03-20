import React from "react";
import styled from "styled-components";

function Header({ timer, isTimerOn }) {
  
  function formatTime(timer) {
    const mins = Math.floor((timer % 3600) / 60);
    const secs = Math.floor(timer % 60);
    let time = "";

    time += "" + mins + ":" + (secs < 10 ? "00" : "");
    time += "" + secs;

    return time;
  }


  return (
    <StyledHeader className="header">
      {isTimerOn && formatTime(timer)}
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
