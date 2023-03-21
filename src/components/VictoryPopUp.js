import React from "react";
import styled from "styled-components";


function VictoryPopUp({ timer, submitScore }) {
    


    const [playerName, setPlayerName] = React.useState(null)


    function handleChange(e) {
        setPlayerName(e.target.value)
    }

    function handleClick(e) {
        e.preventDefault();
        if (playerName === null) return;
        submitScore(playerName, formatTime(timer))
        setPlayerName(null)
       
    }

    function formatTime(timer) {
        const mins = Math.floor((timer % 3600) / 60);
        const secs = Math.floor(timer % 60);
        let time = "";
        time += "" + mins + ":" + (secs < 10 ? "0" : "");
        time += "" + secs;
        return time;
    }

    return (
        <StyledVictoryPopUp className="header">
            {formatTime(timer)}
            <StyledForm>
                <InputWrapper className="input-wrapper">
                    <StyledLabel htmlFor="player-name"> ANNAHA NIMI:</StyledLabel>
                    <input onChange={(e) => handleChange(e)} type="text" id="player-name" name="player-name"></input>
                </InputWrapper>
                    <button onClick={(e) => handleClick(e)}>
                        Submit Score
                    </button>
                <button onClick={()=>window.location.reload()}>
                    Play again
                </button>
            </StyledForm>

        </StyledVictoryPopUp>
    );
}

const StyledVictoryPopUp = styled.div`
  font-size: 2rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: max-content;
  height: max-content;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  padding: 50px;
  background-color: rgba(199, 158, 199, 1);
  border: 1px solid black;
  border-radius: 10px;
  z-index: 600;
  cursor: auto;
`

const InputWrapper = styled.div`
justify-content: center;
align-items: center;
display: flex;
flex-flow: column;
gap: 5px;
`

const StyledForm = styled.form`
margin-top: 30px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
const StyledLabel = styled.label`
    font-size: 1rem;
`
export default VictoryPopUp;
