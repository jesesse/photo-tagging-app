import React from "react";
import styled from "styled-components";

function VictoryPopUp({ timer, submitScore }) {

    function handleClick(e) {
        e.preventDefault();
        submitScore("jesse", formatTime(timer))
    }

    function formatTime(timer) {
        const mins = Math.floor((timer % 3600) / 60);
        const secs = Math.floor(timer % 60);
        let time = "";

        time += "" + mins + ":" + (secs < 10 ? "00" : "");
        time += "" + secs;

        return time;
    }

    return (
        <StyledVictoryPopUp className="header">
            {formatTime(timer)}
            <StyledForm>
                <label>ANNAHA NIMI</label>
                <input type="text"></input>
                <button onClick={(e) => handleClick(e)}>
                    Submit Score
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
  padding: 50px;
  position: fixed;
  width: max-content;
  height: max-content;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(199, 158, 199, 1);
  border: 1px solid black;
  border-radius: 10px;
  z-index: 600;
  cursor: auto;
`

const StyledForm = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

export default VictoryPopUp;
