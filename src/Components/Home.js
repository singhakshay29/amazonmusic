import CardComponent from "./CardComponent";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../DataContext";
import HeadingComponent from "./HeadingComponent";
import CardComponent2 from "./CardComponent2";
const Home = ({ setSearchItem, updateSongPlayCallback }) => {
  const {
    sadData,
    happyData,
    albumData,
    artistData,
    excitedData,
    romanticData,
  } = useContext(DataContext);
  const [currentDataIndexSad, setCurrentDataIndexSad] = useState(0);
  const [currentDataIndexAlbum, setCurrentDataIndexAlbum] = useState(1);
  const [currentDataIndexHappy, setCurrentDataIndexHappy] = useState(0);
  const [currentDataIndexArtist, setCurrentDataIndexArtist] = useState(0);
  const [currentDataIndexExcited, setCurrentDataIndexExcited] = useState(0);
  const [currentDataIndexRomantic, setCurrentDataIndexRomantic] = useState(0);

  const handleNext = () => {
    setCurrentDataIndexAlbum((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setCurrentDataIndexAlbum((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextA = () => {
    setCurrentDataIndexArtist((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackA = () => {
    setCurrentDataIndexArtist((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextR = () => {
    setCurrentDataIndexRomantic((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackR = () => {
    setCurrentDataIndexRomantic((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextH = () => {
    setCurrentDataIndexHappy((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackH = () => {
    setCurrentDataIndexHappy((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextE = () => {
    setCurrentDataIndexExcited((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackE = () => {
    setCurrentDataIndexExcited((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextS = () => {
    setCurrentDataIndexSad((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackS = () => {
    setCurrentDataIndexSad((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    setSearchItem("");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="hd1">
      <HeadingComponent
        heading="Popular Album"
        data={albumData}
        handleNext={handleNext}
        handleBack={handleBack}
        currentData={currentDataIndexAlbum}
      />
      <div className="hd3">
        {albumData?.length > 0 &&
          albumData
            .slice(currentDataIndexAlbum, currentDataIndexAlbum + 10)
            .map((data) => (
              <>
                <CardComponent2 data={data} />
              </>
            ))}
      </div>
      <HeadingComponent
        data={romanticData}
        heading="Romantic Songs"
        handleNext={handleNextR}
        handleBack={handleBackR}
        currentData={currentDataIndexRomantic}
      />
      <div className="hd3">
        {romanticData.length > 0 &&
          romanticData
            .slice(currentDataIndexRomantic, currentDataIndexRomantic + 10)
            .map((album, index) => (
              <CardComponent
                album={album}
                index={index}
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
      <HeadingComponent
        data={happyData}
        heading="Happy Songs"
        handleNext={handleNextH}
        handleBack={handleBackH}
        currentData={currentDataIndexHappy}
      />
      <div className="hd3">
        {happyData.length > 0 &&
          happyData
            .slice(currentDataIndexHappy, currentDataIndexHappy + 10)
            .map((album, index) => (
              <CardComponent
                album={album}
                index={index}
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
      <HeadingComponent
        data={artistData}
        heading="Artists"
        handleNext={handleNextA}
        handleBack={handleBackA}
        currentData={currentDataIndexArtist}
      />
      <div className="hd3">
        {artistData.length > 0 &&
          artistData
            .slice(currentDataIndexArtist, currentDataIndexArtist + 10)
            .map((data) => (
              <>
                <CardComponent2 data={data} />
              </>
            ))}
      </div>
      <HeadingComponent
        data={excitedData}
        heading="Excited Songs"
        handleNext={handleNextE}
        handleBack={handleBackE}
        currentData={currentDataIndexExcited}
      />
      <div className="hd3">
        {excitedData.length > 0 &&
          excitedData
            .slice(currentDataIndexExcited, currentDataIndexExcited + 10)
            .map((album, index) => (
              <CardComponent
                album={album}
                index={index}
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
      <HeadingComponent
        data={sadData}
        heading="Sad Songs"
        handleNext={handleNextS}
        handleBack={handleBackS}
        currentData={currentDataIndexSad}
      />
      <div className="hd3">
        {sadData.length > 0 &&
          sadData
            .slice(currentDataIndexSad, currentDataIndexSad + 10)
            .map((album, index) => (
              <CardComponent
                album={album}
                index={index}
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
