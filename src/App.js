import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/main.css'

import { getFirestore, getDoc, doc, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Game from "./pages/Game/Game";
import LevelSelect from "./pages/Home/LevelSelect";

function App({ app }) {
  const db = getFirestore(app);
  const storage = getStorage(app);

  const [levelCoords, setLevelCoords] = React.useState()
  const [levelImage, setLevelImage] = React.useState()

  React.useEffect(() => {
    getLevelPhoto();
    getLevelCoordinates();
  }, [])


  async function getLevelCoordinates(level = 1) {
    const coordsRef = doc(db, `coordinates/level${level}`);
    const coordsSnap = await getDoc(coordsRef)
    setLevelCoords(coordsSnap.data())
  }

  async function getLevelPhoto(level = 1) {
    const levelImageUrl = await getDownloadURL(ref(storage, `level-images/level${level}.jpeg`));
    setLevelImage(levelImageUrl)
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LevelSelect image={levelImage} levelCoords={levelCoords} />}
        />
        <Route path="/game"
          element={
            <Game
              image={levelImage} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
