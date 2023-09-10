import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Podcasts from "./Components/Podcasts";
import Library from "./Components/Library";
import Subscription from "./Components/Subscription";
import Playlist from "./Components/Playlist";
import "./App.css";
//import CardFunction from "./Components/CardFunction";
import MusicPlayerComponents from "./Components/MusicPlayerComponents";
import MusicPlay from "./Components/MusicPlay";
import SignIn from "./Components/SignIn";
import SignUp from "./SignUp";
function App() {
  const [songPlayId, setSongPlayId] = useState("");

  const updateSongPlayId = useCallback((id) => {
    setSongPlayId(id);
  }, [songPlayId]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        {songPlayId && <MusicPlayerComponents songPlayId={songPlayId} />}
        <Routes>
          <Route
            path="/"
            element={<Home updateSongPlayCallback={updateSongPlayId} />}
          />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/library" element={<Library />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="playlist/:id" element={<Playlist />} />
          <Route path="musicplayer/:id" element={<MusicPlayerComponents />} />
          <Route path="musicplay/:id" element={<MusicPlay />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
