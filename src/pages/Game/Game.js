import React from "react";
import _ from "lodash";
import styled from 'styled-components';
import CrossHair from "../../components/Crosshair";
import CharacterSelectPopUp from "../../components/CharacterSelectPopUp";
import { useParams } from "react-router-dom";
import { getDoc, doc, getFirestore } from "firebase/firestore"
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Header from "../../components/Header";
import VictoryPopUp from "../../components/VictoryPopUp";
import CharacterFoundMarker from "../../components/CharacterFoundMarker";

function Game({ app }) {

    const storage = getStorage(app)
    const db = getFirestore(app)

    const { level } = useParams();
    const [cursorLocation, setCursorLocation] = React.useState({ x: 1, y: 1 });
    const [isClicked, setIsClicked] = React.useState(false)
    const [isCharacterSelectPopUpOpen, setIsCharacterSelectPopUpOpen] = React.useState(false)
    const [isWrongAnswerPopUpOpen, setIsWrongAnswerPopUpOpen] = React.useState(false)
    const [isVictoryPopUpOpen, setIsVictoryPopUpOpen] = React.useState(false)
    const [imageURL, setImageURL] = React.useState();
    const [characters, setCharacters] = React.useState();
    const [foundCharacters, setFoundCharacters] = React.useState([])


    React.useEffect(() => {
        getLevelImage().then((url) => { setImageURL(url) });
        getCharacters().then(characters => {
            setCharacters(characters)
        })
    }, [])

    React.useEffect(() => {
        console.log(foundCharacters.length)
        console.log(_.size(characters))
        if (!(_.size(characters) === 0) && foundCharacters.length === _.size(characters)) {
            setIsVictoryPopUpOpen(true)
        }
    }, [characters])

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
        if (isClicked) {
            setIsClicked(false)
            setIsCharacterSelectPopUpOpen(false)
        } else {
            setIsClicked(true)
            setIsCharacterSelectPopUpOpen(true)
        }
    }

    function handleCharacterSelectClick(characterName) {
        if (checkAnswer(characterName)) {
            setCharacters(prev => {
                prev[characterName].found = true;
                return { ...prev };
            })
            setFoundCharacters(prev => prev.concat(characters[characterName]))
        } else {
            setIsWrongAnswerPopUpOpen(true);
            setTimeout(()=>{setIsWrongAnswerPopUpOpen(false)}, 2000)
        }
        setIsClicked(false)
        setIsCharacterSelectPopUpOpen(false)
    }

    function checkAnswer(characterName) {
        const correctCoords = characters[characterName];
        if ((cursorLocation.x < correctCoords.x + 40 && cursorLocation.x > correctCoords.x - 40)
            && (cursorLocation.y < correctCoords.y + 40 && cursorLocation.y > correctCoords.y - 40)) return true;
        else return false;
    }

    function handleHover(e) {
        if (isClicked) return;
        setCursorLocation({ x: e.pageX, y: e.pageY })
    }

    return (
        <GamePage>
            <ImageContainer isClicked={isClicked}>
                <Image
                    onMouseMove={(e) => { handleHover(e) }}
                    onClick={() => { handleClick() }}
                    src={imageURL}
                    alt="Game Image" />
                <CrossHair
                    cursorLocation={cursorLocation} />
                {isCharacterSelectPopUpOpen &&
                    <CharacterSelectPopUp
                        currentLocation={cursorLocation}
                        characters={characters}
                        handleCharacterSelectClick={handleCharacterSelectClick} />
                }
                {isWrongAnswerPopUpOpen &&
                    <WrongAnswerPopUp location={cursorLocation}>Wrong Answer, try again!</WrongAnswerPopUp>
                }
                {isVictoryPopUpOpen &&
                    <VictoryPopUp />
                }
                {foundCharacters.map((char, index) => {
                    return (<CharacterFoundMarker key={index} location={char}></CharacterFoundMarker>)
                })}
            </ImageContainer>
        </GamePage>
    );
}



const GamePage = styled.div`
`



const ImageContainer = styled.div`
  cursor: ${props => props.isClicked ? 'pointer' : 'none'};
  position: relative;
  width: min-content;
  height: min-content;
`
const WrongAnswerPopUp = styled.div`
  background-color: aliceblue;
  font-size: 2rem;
  font-weight: 400;
  text-decoration: underline;
  color: red;
  position: absolute;
  top: ${props => props.location.y - 70 + 'px'};
  left: ${props => props.location.x - 150 + 'px'}
`

const Image = styled.img`
  border: 1px solid black;
  width: 1920px;
  height: 1080px
`



export default Game;
