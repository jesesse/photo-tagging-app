import React from "react";
import styled from "styled-components";

function CharacterSelectPopUp({ currentLocation, characters, handleCharacterSelectClick }) {
  
  const newArrayDataOfOjbect = Object.entries(characters).map((e) => ( { [e[0]]: e[1] } ));
  console.log(newArrayDataOfOjbect)
  const characterList = [];
  for(const characterName in characters){
    if (characters[characterName].found) continue;
    characterList.push(characterName)
  }

  const characterElements = characterList.map(character => {
   return (
      <StyledDiv key={character} onClick={(e) => handleCharacterSelectClick(e.target.textContent)}>
        {character}
      </StyledDiv>)
  })

  return (
    <StyledCharacterPopUp currentLocation={currentLocation}>
      {characterElements}
    </StyledCharacterPopUp>
  );
}

const StyledCharacterPopUp = styled.div`
  color: white;
  border: 1px solid black;
  background-color: rgb(0 0 0 / 75%);
  position: absolute;
  top: ${props => props.currentLocation.y + 20 + "px"};
  left: ${props => props.currentLocation.x + 20 + "px"};

`

const StyledDiv = styled.div`
  border: 1px solid black;
  font-size: 2rem;
  padding: 10px 20px;
&:hover {
    cursor: pointer;
    background-color: aliceblue;
    color: black;
  }
`

export default CharacterSelectPopUp;
