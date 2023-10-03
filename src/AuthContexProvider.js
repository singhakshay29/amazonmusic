import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContex";
const baseUrlSong =
  "https://academics.newtonschool.co/api/v1/music/favorites/like";
const AuthContextProvider = ({ children }) => {
  const [id, setId] = useState([]);
  const [token, setToken] = useState("");
  const [heading, setHeading] = useState("");
  const [signupData, setSignupData] = useState("");
  const [signSuccess, setSignSuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seeAllData, setSeeAllData] = useState("");
  const [hoverStates, setHoverStates] = useState(
    Array(Array.length).fill(false)
  );

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

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const saveSignupData = (data) => {
    setSignupData(data);
    setSignSuccess(true);
    setToken(data.token);
    localStorage.setItem(
      "signupDeatils",
      JSON.stringify({
        signup: data,
      })
    );
  };
  const clearSignupData = () => {
    localStorage.removeItem("signupDeatils");
    setSignupData(null); // Clear the state as well
    setSignSuccess(false); // Reset signSuccess state
    setToken(null); // Reset token state
  };

  async function getTheFavList() {
    try {
      const user = localStorage.getItem("signupDeatils");
      if (user) {
        const parsedData = JSON.parse(user);
        const response = await fetch(baseUrlSong, {
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
        const newIdArray = data.data?.songs.map((item) => item._id);

        // map((item) => item._id);
        setId(newIdArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("signupDeatils");
    if (user) {
      const parsedData = JSON.parse(user);
      if (parsedData) {
        setSignSuccess(true);
        setSignupData(parsedData.signup);
        setToken(parsedData.signup.token);
      }
    }
    getTheFavList();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        id,
        token,
        setId,
        heading,
        isPlaying,
        signupData,
        seeAllData,
        setHeading,
        hoverStates,
        signSuccess,
        setIsPlaying,
        setSeeAllData,
        handleMouseEnter,
        handleMouseLeave,
        togglePlayPause,
        saveSignupData,
        clearSignupData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
