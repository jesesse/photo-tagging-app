import React from "react";
import styled from "styled-components";

function CharacterFoundMarker({location}) {

  return (
    <StyledMarker location={location}>
    </StyledMarker>
  );
}

const StyledMarker = styled.div`
position: absolute;
top: ${props => props.location.y - 36  + 'px'};
left: ${props => props.location.x - 36  + 'px'};
border-radius: 50%;
border: 3px dashed black;
background-color: #32cb0069;
width: 75px;
height: 75px;
cursor: auto;
`

export default CharacterFoundMarker;
