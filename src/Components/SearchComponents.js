import React from "react";

export default function SearchComponents({ searchItem }) {
  async function getTheDeatails() {
    //const storedsongs = localStorage.getItem("musicData");
    const storedalbum = localStorage.getItem("albumData");

    //const parsedDatasongs = JSON.parse(storedsongs);
    const parsedDataalbum = JSON.parse(storedalbum);

    // const songsArray = parsedDatasongs.musicData;
    const songsSecondArray = parsedDataalbum.albumData;
    console.log(songsSecondArray);

    const filterArray = songsSecondArray.filter((item) => {
      const filterArraysArtist = item.artists.filter((artist) => {
        if (
          artist.name.toLowerCase().includes(searchItem.toLocaleLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });
      console.log(filterArraysArtist);
    });
  }
  return <div>SearchComponents</div>;
}
