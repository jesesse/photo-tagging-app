import Header from "./components/Header";

import React from "react";
import styled from 'styled-components';
import './styles/main.css'

import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import CharacterSelectPopUp from "./components/CharacterSelectPopUp";

function App({ app }) {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [currentRelativeMouseLocation, setCurrentRelativeMouseLocation] = React.useState({ x: 2, y: 3 });
  const [levelImage, setLevelImage] = React.useState()
  const [levelCoords, setLevelCoords] = React.useState();
  const[isPopUpOpen, setIsPopUpOpen] = React.useState(false)

  React.useEffect(() => {
    getLevelCoordinates();
    getLevelPhoto();
  }, [])

  async function getLevelCoordinates(level = 1) {
    const coordsRef = doc(db, `coordinates/level${level}`);
    const coordsSnap = await getDoc(coordsRef)
    setLevelCoords(coordsSnap.data())
  }

  async function getLevelPhoto(level = 1) {
    const levelImageUrl = await getDownloadURL(ref(storage, `level-images/level${level}.jpeg`));
    setLevelImage(levelImageUrl)
    console.log(levelImageUrl)
  }

  function handleClick(e) {
    let relX = currentRelativeMouseLocation.x;
    let relY = currentRelativeMouseLocation.y;
    setIsPopUpOpen(true)

    if ((relX < 86.5)
      && (relX > 84)
      && (relY < 77)
      && (relY > 71)) alert("wldo löyty")
    else alert("try again")

    console.log(relX)
    console.log(relY)
  }

  function handleHover(e) {
    let relX = (((e.pageX) / e.target.offsetWidth) * 100);
    let relY = (((e.pageY) / e.target.offsetHeight) * 100);
    setCurrentRelativeMouseLocation({ x: relX, y: relY })
  }


  return (
    <AppContainer>
      <ImageContainer>
        <Image onMouseMove={(e) => { handleHover(e) }} onClick={(e) => { handleClick(e) }} src={levelImage} alt="" />
        <StyledCrosshair currentLocation={currentRelativeMouseLocation}></StyledCrosshair>
        {isPopUpOpen && <CharacterSelectPopUp currentLocation={currentRelativeMouseLocation} />}
      </ImageContainer>
    </AppContainer>
  );
}


const AppContainer = styled.div`

`

const ImageContainer = styled.div`
  position: relative;
  width: min-content;
  height: min-content;
`

const Image = styled.img`

  border: 1px solid black;
`
const StyledCrosshair = styled.div.attrs((props) => ({
  /*Componesate the width and height of the crosshair 
  (25px relative to percents) so that the cursor is in 
  the middle of crosshair. 
  (otherwise the cursor is in the top left corner)*/
  style: {
    top: props.currentLocation.y - 1 + '%',
    left: props.currentLocation.x - 0.7 + '%',
  },
}))`
  pointer-events: none;
  position: absolute;
  border-radius: 50%;
  border: 3px solid black;
  background-color: #0000003b;
  width: 50px;
  height: 50px;
`

export default App;
