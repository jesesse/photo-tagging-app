import React from "react";
import styled from "styled-components";

function VictoryPopUp() {
    return (
        <StyledVictoryPopUp className="header">
            WITTU VOITIT HYVÄ
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
  position: absolute;
  width: max-content;
  height: max-content;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: antiquewhite;
`

const StyledForm = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

export default VictoryPopUp;
