import React from "react";
import styled from "styled-components";

function VictoryPopUp({timer}) {
    return (
        <StyledVictoryPopUp className="header">
            WITTU VOITIT HYVÄ
            
            <span>{("0" + Math.floor(timer / 60) % 60).slice(-2)} : {("0" + timer % 60).slice(-2)}</span>
            <StyledForm>
                <label>ANNAHA NIMI</label>
                <input type="text"></input>
                <button>
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
  background-color: rgba(199, 158, 199, 0.7);
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
