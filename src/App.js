import React from "react";
import styled from 'styled-components';
import '.styles/main.css'

import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function App({ app }) {

  const [levelImage, setLevelImage] = React.useState()

  const db = getFirestore(app);
  const storage = getStorage(app);

  React.useEffect(()=> {
    getLevelCoordinates()
    getLevelPhoto();
  }, [])

  async function getLevelCoordinates(level = 1) {
    const coordsRef = doc(db, `coordinates/level${level}`);
    const coordsSnap = await getDoc(coordsRef)
    console.log(coordsSnap.data())

  }

  async function getLevelPhoto(level = 1) {
    const levelImageUrl = await getDownloadURL(ref(storage, `level-images/level${level}.jpeg`));
    setLevelImage(levelImageUrl)
    console.log(levelImageUrl)
  }




  return (
    <AppContainer>
      <StyledImage src={levelImage} alt="level-image" />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-flow: column;

`

const StyledImage = styled.img`
  height: 100vh;
`

export default App;
