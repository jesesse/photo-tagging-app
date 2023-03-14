import React from "react";
import styled from 'styled-components';
import CrossHair from "../../components/Crosshair";
import CharacterSelectPopUp from "../../components/CharacterSelectPopUp";
import { useParams } from "react-router-dom";
import { getDoc, doc, getFirestore} from "firebase/firestore"
import { getDownloadURL, getStorage, ref } from "firebase/storage";

function Game({ app }) {

    const storage = getStorage(app)
    const db = getFirestore(app)
    const { level } = useParams();
    
    const [cursorLocation, setCursorLocation] = React.useState({ x: 1, y: 1 });
    const [isClicked, setIsClicked] = React.useState(false)
    const [isPopUpOpen, setIsPopUpOpen] = React.useState(false)
    const [imageURL, setImageURL] = React.useState();
    const [characters, setCharacters] = React.useState();
    const [characterCoords, setCharacterCoords] = React.useState();

    React.useEffect(() => {
        getLevelImage().then((url) => { setImageURL(url) });
        getCharacters().then(coords => {
            setCharacterCoords(coords)
            let newCharacters = [];
            for (const character in coords) {
                newCharacters.push(character)
            }
            setCharacters(newCharacters)
        })
    }, [])

    async function getCharacters() {
        const characterCoordsRef = doc(db, "coordinates", "level1");
        const characterCoordsSnapshot = await getDoc(characterCoordsRef);
        return characterCoordsSnapshot.data();
    }

    async function getLevelImage() {
        const imgRef = ref(storage, `level-images/level${level}.jpg`)
        const url = await getDownloadURL(imgRef);
        return (url)
    }

    function handleClick() {
        setIsClicked(true)
        setIsPopUpOpen(true)
    }

    function handleCharacterSelectClick(characterName) {
        const correctCoords = characterCoords[characterName];
        if ((cursorLocation.x < correctCoords.x + 40 && cursorLocation.x > correctCoords.x - 40)
            && (cursorLocation.y < correctCoords.y + 40 && cursorLocation.y > correctCoords.y - 40)) alert("found " + characterName)
        else alert("Keep Looking!")
        
        setIsClicked(false)
        setIsPopUpOpen(false)
    }

    function handleHover(e) {
        if (isClicked) return;
        let relX = ((e.pageX));
        let relY = ((e.pageY));
        setCursorLocation({ x: relX, y: relY })
    }


    return (
        <ImageContainer isClicked={isClicked}>
            <Image
                onMouseMove={(e) => { handleHover(e) }}
                onClick={() => { handleClick() }}
                src={imageURL}
                alt="Game Image" />
            <CrossHair
                cursorLocation={cursorLocation} />
            {isPopUpOpen &&
                <CharacterSelectPopUp
                    currentLocation={cursorLocation}
                    characters={characters}
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
  width: 1924px;
  height: 1080px
`
export default Game;
