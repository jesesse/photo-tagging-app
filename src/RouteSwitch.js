import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";


import Game from "./pages/Game/Game";
import Home from "./pages/Home/Home";

function RouteSwitch({ app }) {

  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/level/:level" element={<Game app={app} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
