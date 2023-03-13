import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <StyledHeader className="header">
      WHERE IS WALDO VITTU
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

`

export default Header;
