import React from "react";
import styled from "styled-components";
function CrossHair({coords}) {

  return (
    <StyledCrosshair></StyledCrosshair>
  );
}

const StyledCrosshair = styled.div`
    border-radius: 50%;
    border: 1px solid black;
    background-color: #0000003b;
    width: 50px;
    height: 50px;
`

export default CrossHair;
