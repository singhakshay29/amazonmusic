import "./App.css";
import SignUp from "./SignUp";
import Pod from "./Components/Pod";
import Term from "./Components/Term";
import Home from "./Components/Home";
import React, { useState } from "react";
import SignIn from "./Components/SignIn";
import Artist from "./Components/Artist";
import Navbar from "./Components/Navbar";
import GetHelp from "./Components/GetHelp";
import Profile from "./Components/Profile";
import Playlist from "./Components/Playlist";
import NotSignIn from "./Components/NotSignIn";
import Searchbar from "./Components/Searchbar";
import Favorites from "./Components/Favorites";
import SearchPage from "./Components/SearchPage";
import SearchAlbum from "./Components/SearchAlbum";
import Subscription from "./Components/Subscription";
import SetUpProfile from "./Components/SetUpProfile";
import NoResultsFound from "./Components/NoResultsFound";
import TrendingPlaylist from "./Components/TrendingPlaylist";
import SearchComponents from "./Components/SearchComponents";
import ShowSearchResults from "./Components/ShowSearchResults";
import MusicPlayerComponents from "./Components/MusicPlayerComponents";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [showNav, setShowNav] = useState(true);
  const [showMusic, setShowMusic] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songPlayId, setSongPlayId] = useState(null);
  const [searchItem, setSearchItem] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);
  const [playpausesong, setPlayPauseSong] = useState(
    Array(Array.length).fill(false)
  );
  const [hoverStates, setHoverStates] = useState(
    Array(Array.length).fill(false)
  );

  const handleShowSearch = () => {
    setShowSearch(true);
  };

  const handleNotShow = () => {
    setShowNav(false);
  };
  const handleShowNav = () => {
    setShowNav(true);
  };
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  function updateSongPlayId(id) {
    setSongPlayId(id);
  }
  const handleNotShowSearch = () => {
    setShowSearch(false);
  };
  const handleTextToSearch = (e) => {
    setSearchItem(e.target.value);
  };
  const handleInputValueToSearch = (e) => {
    e.preventDefault();
    setSearchItem("");
  };

  const handleTogglePlayPause = (index) => {
    const songplay = [...playpausesong];
    songplay[index] = !songplay[index];
    console.log(songplay[index]);
    // Toggle the state (true to false, or false to true)
    setPlayPauseSong(songplay);
  };

  const handleMouseEnter = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };
  const handleMouseLeave = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  return (
    <div className="App">
      <Router>
        {songPlayId && showMusic && (
          <MusicPlayerComponents songPlayId={songPlayId} />
        )}
        {showSearch && (
          <Searchbar
            searchItem={searchItem}
            handleShowNav={handleShowNav}
            handleTextToSearch={handleTextToSearch}
            handleNotShowSearch={handleNotShowSearch}
            handleInputValueToSearch={handleInputValueToSearch}
          />
        )}
        {showNav && (
          <Navbar
            searchItem={searchItem}
            signSuccess={signSuccess}
            handleNotShow={handleNotShow}
            setSignSuccess={setSignSuccess}
            handleShowSearch={handleShowSearch}
            handleTextToSearch={handleTextToSearch}
            handleInputValueToSearch={handleInputValueToSearch}
          />
        )}
        <Routes>
          <Route path="searchpage" element={<SearchPage />} />
          <Route path="gethelp" element={<GetHelp />} />
          <Route
            path="notsignin"
            element={<NotSignIn handleNotShow={handleNotShow} />}
          />
          <Route
            path="noresultfound"
            element={<NoResultsFound searchItem={searchItem} />}
          />

          <Route
            path="searchcomponents"
            element={<SearchComponents searchItem={searchItem} />}
          />

          <Route
            path="/subscription"
            Component={() => {
              setShowMusic(false);
              return <Subscription handleNotShow={handleNotShow} />;
            }}
          />
          <Route
            path="favorites"
            element={
              <Favorites
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
                updateSongPlayCallback={updateSongPlayId}
              />
            }
          />
          <Route
            path="/pod"
            element={
              <Pod
                searchItem={searchItem}
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                hoverStates={hoverStates}
                handleShowNav={handleShowNav}
                setSearchItem={setSearchItem}
                togglePlayPause={togglePlayPause}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                updateSongPlayCallback={updateSongPlayId}
                handleNotShowSearch={handleNotShowSearch}
              />
            }
          />
          <Route
            path="playlist/:id"
            element={
              <Playlist
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                handleShowNav={handleShowNav}
                togglePlayPause={togglePlayPause}
                handleNotShowSearch={handleNotShowSearch}
                updateSongPlayCallback={updateSongPlayId}
              />
            }
          />
          <Route
            path="signin"
            Component={() => {
              setShowMusic(false);
              return (
                <SignIn
                  signSuccess={signSuccess}
                  handleNotShow={handleNotShow}
                  setSignSuccess={setSignSuccess}
                />
              );
            }}
          />
          <Route
            path="signup"
            Component={() => {
              setShowMusic(false);
              return (
                <SignUp
                  signSuccess={signSuccess}
                  handleNotShow={handleNotShow}
                  setSignSuccess={setSignSuccess}
                />
              );
            }}
          />
          <Route
            path="showsearchresults"
            element={
              <ShowSearchResults
                searchItem={searchItem}
                hoverStates={hoverStates}
              />
            }
          />
          <Route
            path="trendingplaylist"
            element={
              <TrendingPlaylist
                isPlaying={isPlaying}
                hoverStates={hoverStates}
                togglePlayPause={togglePlayPause}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                updateSongPlayCallback={updateSongPlayId}
              />
            }
          />
          <Route
            path="searchalbum"
            element={
              <SearchAlbum
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                handleShowNav={handleShowNav}
                setSearchItem={setSearchItem}
                togglePlayPause={togglePlayPause}
                updateSongPlayCallback={updateSongPlayId}
                handleNotShowSearch={handleNotShowSearch}
              />
            }
          />
          <Route
            path="artist"
            element={
              <Artist
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                handleShowNav={handleShowNav}
                setSearchItem={setSearchItem}
                togglePlayPause={togglePlayPause}
                updateSongPlayCallback={updateSongPlayId}
                handleNotShowSearch={handleNotShowSearch}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                hoverStates={hoverStates}
                playpausesong={playpausesong}
                handleShowNav={handleShowNav}
                setSearchItem={setSearchItem}
                togglePlayPause={togglePlayPause}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                updateSongPlayCallback={updateSongPlayId}
                handleTogglePlayPause={handleTogglePlayPause}
              />
            }
          />
          <Route path="term" element={<Term handleNotShow={handleNotShow} />} />
          <Route path="setup" element={<SetUpProfile />} />
          <Route
            path="profile"
            element={<Profile handleShowNav={handleShowNav} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
