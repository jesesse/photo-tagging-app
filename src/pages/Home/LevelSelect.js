import React from "react";
import styled from 'styled-components';

function LevelSelect({ image, levelCoords }) {

    console.log(image)
    console.log(levelCoords)

    
    React.useEffect(() => {
    }, [])

    return (
        <Container>
            <img src={image} alt="" />
        </Container>
    );
}

const Container = styled.div`
    width: 500px;
    height: 500px;
    background-color: aquamarine;
`

const LevelContainer = styled.button`
padding: 20px;
font-size: 2rem;
color: black;
&:hover{
    cursor: pointer;
}
`

export default LevelSelect;
