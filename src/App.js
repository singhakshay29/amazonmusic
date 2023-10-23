import "./App.css";
import SignUp from "./SignUp";
import Pod from "./Components/Pod";
import Home from "./Components/Home";
import Term from "./Components/Term";
import React, { useState } from "react";
import SignIn from "./Components/SignIn";
import Artist from "./Components/Artist";
import SeeAll from "./Components/SeeAll";
import Navbar from "./Components/Navbar";
import GetHelp from "./Components/GetHelp";
import Profile from "./Components/Profile";
import Playlist from "./Components/Playlist";
import NotSignIn from "./Components/NotSignIn";
import Favorites from "./Components/Favorites";
import SearchPage from "./Components/SearchPage";
import ComingSoon from "./Components/ComingSoon";
import SearchAlbum from "./Components/SearchAlbum";
import SetUpProfile from "./Components/SetUpProfile";
import AuthContextProvider from "./AuthContexProvider";
import DataContextProvider from "./DataContextProvider";
import NoResultsFound from "./Components/NoResultsFound";
import TrendingPlaylist from "./Components/TrendingPlaylist";
import SearchComponents from "./Components/SearchComponents";
import ShowSearchResults from "./Components/ShowSearchResults";
import MusicPlayerComponents from "./Components/MusicPlayerComponents";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [songPlayId, setSongPlayId] = useState("");
  const [searchItem, setSearchItem] = useState("");

  function updateSongPlayId(id) {
    setSongPlayId(id);
  }
  const handleTextToSearch = (e) => {
    setSearchItem(e.target.value);
  };
  const handleInputValueToSearch = (e) => {
    e.preventDefault();
    setSearchItem("");
  };
  return (
    <>
      <AuthContextProvider>
        <DataContextProvider>
          <Router>
            {songPlayId && <MusicPlayerComponents songPlayId={songPlayId} />}
            <Navbar
              searchItem={searchItem}
              handleTextToSearch={handleTextToSearch}
              handleInputValueToSearch={handleInputValueToSearch}
            />
            <Routes>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="searchpage" element={<SearchPage />} />
              <Route path="gethelp" element={<GetHelp />} />
              <Route path="notsignin" element={<NotSignIn />} />
              <Route path="term" element={<Term />} />
              <Route path="setup" element={<SetUpProfile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="comingSoon" element={<ComingSoon />} />
              <Route
                path="noresultfound"
                element={<NoResultsFound searchItem={searchItem} />}
              />
              <Route
                path="searchcomponents"
                element={<SearchComponents searchItem={searchItem} />}
              />
              <Route
                path="favorites"
                element={
                  <Favorites updateSongPlayCallback={updateSongPlayId} />
                }
              />
              <Route
                path="pod"
                element={
                  <Pod
                    searchItem={searchItem}
                    setSearchItem={setSearchItem}
                    updateSongPlayCallback={updateSongPlayId}
                  />
                }
              />
              <Route
                path="playlist"
                element={
                  <Playlist
                    setSearchItem={setSearchItem}
                    updateSongPlayCallback={updateSongPlayId}
                  />
                }
              />

              <Route
                path="showsearchresults"
                element={<ShowSearchResults searchItem={searchItem} />}
              />
              <Route
                path="trendingplaylist"
                element={
                  <TrendingPlaylist updateSongPlayCallback={updateSongPlayId} />
                }
              />
              <Route
                path="searchalbum"
                element={
                  <SearchAlbum
                    setSearchItem={setSearchItem}
                    updateSongPlayCallback={updateSongPlayId}
                  />
                }
              />
              <Route
                path="artist"
                element={
                  <Artist
                    setSearchItem={setSearchItem}
                    updateSongPlayCallback={updateSongPlayId}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <Home
                    setSearchItem={setSearchItem}
                    updateSongPlayCallback={updateSongPlayId}
                  />
                }
              />

              <Route
                path="seeall"
                element={<SeeAll updateSongPlayCallback={updateSongPlayId} />}
              />
            </Routes>
          </Router>
        </DataContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
