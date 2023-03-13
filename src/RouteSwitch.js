import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Game from "./pages/Game/Game";
import Home from "./pages/Home/Home";

function RouteSwitch({ app }) {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/game" element={<Game app={app} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
