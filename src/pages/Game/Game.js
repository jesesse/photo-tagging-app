import React from "react";
import _ from "lodash";
import styled from 'styled-components';
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc, getFirestore, setDoc, collection } from "firebase/firestore"
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Header from "../../components/Header";
import CrossHair from "../../components/Crosshair";
import CharacterSelectPopUp from "../../components/CharacterSelectPopUp";
import VictoryPopUp from "../../components/VictoryPopUp";
import CharacterFoundMarker from "../../components/CharacterFoundMarker";

function Game({ app }) {

    const storage = getStorage(app)
    const db = getFirestore(app)

    const { level } = useParams();
    let navigate = useNavigate();
    const [cursorLocation, setCursorLocation] = React.useState({});
    const [clickedLocation, setClickedlocation] = React.useState()
    const [isClicked, setIsClicked] = React.useState(false)
    const [isCharacterSelectPopUpOpen, setIsCharacterSelectPopUpOpen] = React.useState(false)
    const [isWrongAnswerPopUpOpen, setIsWrongAnswerPopUpOpen] = React.useState(false)
    const [isCorrectAnswerPopUpOpen, setIsCorrectAnswerPopUpOpen] = React.useState(false)
    const [isVictoryPopUpOpen, setIsVictoryPopUpOpen] = React.useState(false)
    const [imageURL, setImageURL] = React.useState();
    const [characters, setCharacters] = React.useState();
    const [foundCharacters, setFoundCharacters] = React.useState([])
    const [guessedCharacter, setGuessedCharacter] = React.useState(null)
    const [isTimerOn, setIsTimerOn] = React.useState(false)
    const [timer, setTimer] = React.useState(0);
    const [highScore, setHighScore] = React.useState([])


    React.useEffect(() => {
        getLevelImage().then((url) => { setImageURL(url) });
        getCharacters().then(characters => {
            setCharacters(characters)
        })
        setIsTimerOn(true)
    }, [])

    React.useEffect(() => {
        let interval
        if (isTimerOn) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        } else clearInterval(interval)

        return () => clearInterval(interval);

    }, [isTimerOn])

    React.useEffect(() => {
        if (!(_.size(characters) === 0) && foundCharacters.length === _.size(characters)) {
            setIsTimerOn(false)
            setIsVictoryPopUpOpen(true)
        }
    }, [characters])


    async function getCharacters() {
        const characterCoordsRef = doc(db, "coordinates", `level${level}`);
        const characterCoordsSnapshot = await getDoc(characterCoordsRef);
        return characterCoordsSnapshot.data();
    }

    async function getLevelImage() {
        const imgRef = ref(storage, `level-images/level${level}.jpg`)
        const url = await getDownloadURL(imgRef);
        return (url)
    }

    async function submitScore(playerName, time) {
        const highScoresRef = doc(db, "highScores", `level${level}`);
        const highScoresRefSnapshot = await getDoc(highScoresRef);
        let scoresObject = highScoresRefSnapshot.data()
        let scoresArray = scoresObject.scores.concat({
            name: playerName,
            time: time
        })
        scoresObject.scores = scoresArray;
        await setDoc(highScoresRef, scoresObject);
        navigate(`/high-scores/level/${level}`)
    }

    function handleClick() {
        if (isClicked) {
            setIsClicked(false)
            setIsCharacterSelectPopUpOpen(false)
        } else {
            setIsClicked(true)
            setClickedlocation(cursorLocation)
            setIsCharacterSelectPopUpOpen(true)
        }
    }

    function handleCharacterSelectClick(characterName) {
        characterName.toLowerCase();
        setGuessedCharacter(characterName)
        if (checkCorrectAnswer(characterName)) {
            setIsCorrectAnswerPopUpOpen(true);
            setTimeout(() => { setIsCorrectAnswerPopUpOpen(false) }, 2000)
            setCharacters(prev => {
                prev[characterName].found = true;
                return { ...prev };
            })
            setFoundCharacters(prev => prev.concat(characters[characterName]))
        } else {
            setIsWrongAnswerPopUpOpen(true);
            setTimeout(() => { setIsWrongAnswerPopUpOpen(false) }, 2000)
        }
        setIsClicked(false)
        setIsCharacterSelectPopUpOpen(false)
    }

    function checkCorrectAnswer(characterName) {
        const correctCoords = characters[characterName];
        if ((cursorLocation.x < correctCoords.x + 40 && cursorLocation.x > correctCoords.x - 40)
            && (cursorLocation.y < correctCoords.y + 40 && cursorLocation.y > correctCoords.y - 40)) return true;
        else return false;
    }

    function handleHover(e) {
        if (isClicked) return;
        setCursorLocation({ x: e.pageX, y: e.pageY - 75 })
    }


    return (
        <GamePage className="GamePAge">
            <Header timer={timer} isTimerOn={isTimerOn}></Header>
            <ImageContainer className="image-container" isClicked={isClicked}>
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
                {isCorrectAnswerPopUpOpen &&
                    <CorrectAnswerPopUp clickedLocation={clickedLocation}>You found {guessedCharacter}!</CorrectAnswerPopUp>
                }
                {isWrongAnswerPopUpOpen &&
                    <WrongAnswerPopUp clickedLocation={clickedLocation}>No {guessedCharacter} there, try again!</WrongAnswerPopUp>
                }
                {isVictoryPopUpOpen &&
                    <VictoryPopUp timer={timer} submitScore={submitScore} />
                }
                {foundCharacters.map((char, index) => {
                    return (<CharacterFoundMarker key={index} location={char}></CharacterFoundMarker>)
                })}
            </ImageContainer>
        </GamePage>
    );
}



const GamePage = styled.div`
    min-width: 100%;
    width: min-content;
`

const ImageContainer = styled.div`
  cursor: ${props => props.isClicked ? 'pointer' : 'none'};
  position: relative;

`
const WrongAnswerPopUp = styled.div`
  background-color: aliceblue;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 400;
  color: red;
  position: absolute;
  top: ${props => props.clickedLocation.y - 80 + 'px'};
  left: ${props => props.clickedLocation.x + 'px'}
`

const CorrectAnswerPopUp = styled.div`
  padding: 10px;
  background-color: aliceblue;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 400;
  color: green;
  position: absolute;
  top: ${props => props.clickedLocation.y - 80 + 'px'};
  left: ${props => props.clickedLocation.x + 'px'}
`

const Image = styled.img`
  width: 1920px;
  height: 1080px
`



export default Game;
