import DataContext from "./DataContext";
import { useEffect, useState } from "react";
import request from "./request";

const DataContextProvider = ({ children }) => {
  const [sadData, setsadData] = useState([]);
  const [albumData, setAlbum] = useState([]);
  const [heading, setHeading] = useState("");
  const [loader, setLoader] = useState(true);
  const [artistData, setArtist] = useState([]);
  const [happyData, setHappyData] = useState([]);
  const [seeAllData, setSeeAllData] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [excitedData, setExcitedData] = useState([]);
  const [favoritesId, setFavoritesId] = useState([]);
  const [romanticData, setromanticData] = useState([]);
  const [trendingSongs, setTrendingSong] = useState([]);
  const [playlistsongs, setplaylistsongs] = useState([]);
  const [hoverStates, setHoverStates] = useState(
    Array(Array.length).fill(false)
  );

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
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

  async function getTheSongData() {
    try {
      const storedData = localStorage.getItem("musicData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const songsArray = parsedData.musicData;
        const filterDataRomantic = songsArray.filter(
          (songs) => songs.mood === "romantic"
        );
        setromanticData(filterDataRomantic);
        const filterDataExcited = songsArray.filter(
          (songs) => songs.mood === "excited"
        );
        setExcitedData(filterDataExcited);
        const filterDataHappy = songsArray.filter(
          (songs) => songs.mood === "happy"
        );
        setHappyData(filterDataHappy);

        const filterDataSad = songsArray.filter(
          (songs) => songs.mood === "sad"
        );
        setsadData(filterDataSad);
        const filterDataTrending = songsArray.filter(
          (songs) => songs.featured === "Trending songs"
        );
        setTrendingSong(filterDataTrending);
      } else {
        const response = await fetch(request.fetchSongs, {
          method: "GET",
          headers: {
            projectId: "8jf3b15onzua",
          },
        });
        const data = await response.json();
        const musicDataSet = data.data;

        const filterDataRomantic = musicDataSet.filter(
          (songs) => songs.mood === "romantic"
        );
        setromanticData(filterDataRomantic);

        const filterDataExcited = musicDataSet.filter(
          (songs) => songs.mood === "excited"
        );
        setExcitedData(filterDataExcited);

        const filterDataHappy = musicDataSet.filter(
          (songs) => songs.mood === "happy"
        );
        setHappyData(filterDataHappy);

        const filterDataSad = musicDataSet.filter(
          (songs) => songs.mood === "sad"
        );
        setsadData(filterDataSad);
        const filterDataTrending = musicDataSet.filter(
          (songs) => songs.featured === "Trending songs"
        );
        setTrendingSong(filterDataTrending);
        localStorage.setItem(
          "musicData",
          JSON.stringify({
            musicData: musicDataSet,
          })
        );
      }
    } catch (error) {
      console.error("Something went wrong");
    }
  }
  async function getThedataAlbum() {
    try {
      const storedData = localStorage.getItem("albumData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setAlbum(parsedData.albumData);
      } else {
        const response = await fetch(request.fetchAlbum, {
          method: "GET",
          headers: {
            projectId: "8jf3b15onzua",
          },
        });
        const data = await response.json();
        const albumDataSet = data.data;
        setAlbum(albumDataSet);

        localStorage.setItem(
          "albumData",
          JSON.stringify({
            albumData: albumDataSet,
          })
        );
      }
    } catch (error) {
      console.error("Something went Wrong");
    }
  }

  async function addandRemoveFavItem(songId) {
    const user = localStorage.getItem("signupDeatils");
    if (user) {
      const parsedData = JSON.parse(user);
      await fetch(request.fetchFavorites, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData.signup.token}`,
          projectId: "8jf3b15onzua",
        },
        body: JSON.stringify({ songId: songId }),
      });
    }
    getTheFavList();
  }

  async function getTheArtist() {
    try {
      const storedData = localStorage.getItem("artistData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setArtist(parsedData.artistData);
      } else {
        const baseUrlArtist =
          "https://academics.newtonschool.co/api/v1/music/artist?limit=100";
        const response = await fetch(baseUrlArtist, {
          method: "GET",
          headers: {
            projectId: "8jf3b15onzua",
          },
        });
        const data = await response.json();
        const artistDataSet = data.data;
        console.log(artistDataSet);
        setArtist(artistDataSet);
        localStorage.setItem(
          "artistData",
          JSON.stringify({
            artistData: artistDataSet,
          })
        );
      }
    } catch (error) {
      console.error("Something went Wrong");
    }
  }

  async function getTheFavList() {
    try {
      const user = localStorage.getItem("signupDeatils");
      if (user) {
        const parsedData = JSON.parse(user);
        const response = await fetch(request.fetchFavorites, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedData.signup.token}`,
            projectId: "8jf3b15onzua",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setplaylistsongs(data.data?.songs);
        const newIdArray = data.data?.songs.map((item) => item._id);
        setFavoritesId(newIdArray);
        setTimeout(() => {
          setLoader(false);
        }, 700);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getTheSongData();
    getTheFavList();
    getThedataAlbum();
    getTheArtist();
  }, []);
  return (
    <DataContext.Provider
      value={{
        loader,
        heading,
        sadData,
        isPlaying,
        albumData,
        happyData,
        artistData,
        seeAllData,
        setHeading,
        excitedData,
        hoverStates,
        favoritesId,
        romanticData,
        playlistsongs,
        trendingSongs,
        setIsPlaying,
        setSeeAllData,
        togglePlayPause,
        handleMouseEnter,
        handleMouseLeave,
        addandRemoveFavItem,
      }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataContextProvider;
