import React from "react";
import styled from 'styled-components';
import CrossHair from "../../components/Crosshair";
import CharacterSelectPopUp from "../../components/CharacterSelectPopUp";
import { useParams } from "react-router-dom";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

function Game({ app }) {

    const { level } = useParams();
    const storage = getStorage(app)
    const [currentRelativeMouseLocation, setCurrentRelativeMouseLocation] = React.useState({ x: 1, y: 1 });
    const [isClicked, setIsClicked] = React.useState(false)
    const [isPopUpOpen, setIsPopUpOpen] = React.useState(false)
    const [image, setImage] = React.useState()

    React.useEffect(() => {
        getLevelImage();
    }, [])

    async function getLevelImage() {
        const imgRef = ref(storage, `level-images/level${level}.jpg`)
        const url = await getDownloadURL(imgRef);
        setImage(url)
    }

    function handleClick() {
        setIsClicked(true)
        setIsPopUpOpen(true)
    }

    function handleCharacterSelectClick(characterName) {
        setIsClicked(false)
        setIsPopUpOpen(false)
    }

    function handleHover(e) {
        if (isClicked) return;

        let relX = (((e.pageX) / e.target.offsetWidth) * 100);
        let relY = (((e.pageY) / e.target.offsetHeight) * 100);
        setCurrentRelativeMouseLocation({ x: relX, y: relY })
    }


    return (
        <ImageContainer isClicked={isClicked}>
            <Image
                onMouseMove={(e) => { handleHover(e) }}
                onClick={() => { handleClick() }}
                src={image}
                alt="Game Image" />
            <CrossHair
                currentRelativeMouseLocation={currentRelativeMouseLocation} />
            {isPopUpOpen &&
                <CharacterSelectPopUp
                    currentLocation={currentRelativeMouseLocation}
                    characters={["jorma", "kekko", "kakka"]}
                    handleCharacterSelectClick={handleCharacterSelectClick} />}
        </ImageContainer>
    );
}


const ImageContainer = styled.div`
  cursor: ${props => props.isClicked ? 'pointer' : 'none'};
  position: relative;
  width: min-content;
  height: min-content;
`

const Image = styled.img`
  border: 1px solid black;
  width: 100vw;
  height: 100vh;
`
export default Game;
