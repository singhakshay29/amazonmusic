import { Typography, Grid } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import DataContext from "../DataContext";
import CardComponent2 from "./CardComponent2";

export default function SeeAll({ updateSongPlayCallback }) {
  const { heading, seeAllData } = useContext(DataContext);
  const [songsData, setSongsData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [artistData, setartistData] = useState([]);
  const renderedItems = seeAllData;

  useEffect(() => {
    const handleCheckData = () => {
      if (heading === "Popular Album") {
        setAlbumData(seeAllData);
      } else if (heading === "Artists") {
        setartistData(seeAllData);
      } else {
        setSongsData(seeAllData);
      }
    };
    handleCheckData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {seeAllData?.length > 0 && (
        <div className="hd1">
          <div className="hd2">
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "22px",
                paddingTop: "10px",
                marginBottom: "2rem",
              }}
              variant="h4">
              {heading}
            </Typography>
          </div>
          <Grid
            spacing={1}
            container
            sx={{
              backgroundColor: "black",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}>
            {albumData?.length > 0 && (
              <>
                {renderedItems?.length > 0 &&
                  renderedItems.map((data) => (
                    <>
                      <CardComponent2 data={data} minWidth="10" />
                    </>
                  ))}
              </>
            )}

            {artistData?.length > 0 && (
              <>
                {renderedItems?.length > 0 &&
                  renderedItems.map((data) => (
                    <CardComponent2 data={data} minWidth="10" />
                  ))}
              </>
            )}
            {songsData?.length > 0 && (
              <>
                {renderedItems?.length > 0 &&
                  renderedItems.map((album, index) => (
                    <CardComponent
                      album={album}
                      index={index}
                      updateSongPlayCallback={updateSongPlayCallback}
                      minWidth="10"
                    />
                  ))}
              </>
            )}
          </Grid>
        </div>
      )}
    </>
  );
}
