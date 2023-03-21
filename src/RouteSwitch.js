import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Game from "./pages/Game/Game";
import HighScore from "./pages/HighScore/HighScore";
import Home from "./pages/Home/Home";

function RouteSwitch({ app }) {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/level/:level" element={<Game app={app} />}/>
        <Route path="/high-scores/" element={<HighScore app={app} />} />
        <Route path="/high-scores/level/:level" element={<HighScore app={app} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
