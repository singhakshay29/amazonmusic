// import React from 'react'
// import { useEffect, useState } from "react";
// import { Container, Typography } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import { CardActionArea } from "@mui/material";
// import { Link } from "react-router-dom";
// import Button from "@mui/material/Button";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import AddIcon from "@mui/icons-material/Add";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// // export default function Card({album,index}) {
// //   return (
// //     <div><Card key={album.id} sx={{ width: 190, margin: "10px 20px" }}>
// //     <CardActionArea>
// //       <Link to={`musicplayer/${album._id}`}>
// //         <CardMedia
// //           component="img"
// //           height="200"
// //           image={album.thumbnail}
// //           alt={album.title}
// //           onMouseOver={() => handleMouseEnter(index)}
// //           onMouseLeave={() => handleMouseLeave(index)}
// //           style={{
// //             transition: "opacity 0.1s ease",
// //             opacity: hoverStates[index] ? "0.9" : "1",
// //             cursor: "pointer",
// //           }}></CardMedia>
// //         {hoverStates[index] && (
// //           <>
// //             <Button
// //               variant="contained"
// //               style={{
// //                 position: "absolute",
// //                 top: "35%",
// //                 left: "50%",
// //                 transform: "translate(-50%, -50%)",
// //                 zIndex: 1,
// //                 background: "transparent",
// //                 color: "white",
// //                 borderRadius: "80%",
// //                 backgroundColor: "rgba(0, 0, 0, 0.5)",
// //               }}
// //               onMouseEnter={() => handleMouseEnter(index)}
// //               onMouseLeave={() => handleMouseLeave(index)}
// //               onClick={() => {
// //                 updateSongPlayCallback(album._id);
// //               }}>
// //               <PlayArrowIcon style={{ fontSize: "2.5rem" }} />
// //             </Button>
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               style={{
// //                 position: "absolute",
// //                 top: "35%",
// //                 left: "20%",
// //                 transform: "translate(-50%, -50%)",
// //                 zIndex: 1,
// //                 background: "transparent",
// //               }}
// //               onMouseEnter={() => handleMouseEnter(index)}
// //               onMouseLeave={() => handleMouseLeave(index)}>
// //               <AddIcon />
// //             </Button>
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               style={{
// //                 position: "absolute",
// //                 top: "35%",
// //                 left: "80%",
// //                 transform: "translate(-50%, -50%)",
// //                 zIndex: 1,
// //                 background: "transparent",
// //                 border: "none",
// //               }}
// //               onMouseEnter={() => handleMouseEnter(index)}
// //               onMouseLeave={() => handleMouseLeave(index)}>
// //               <MoreHorizIcon />
// //             </Button>
// //           </>
// //         )}
// //       </Link>
// //       <CardContent
// //         style={{
// //           height: "100px",
// //           width: "12em",
// //           overflow: "hidden",
// //           textOverflow: "ellipsis",
// //           whiteSpace: "nowrap",
// //           background: "black",
// //           color: "white",
// //         }}>
// //         <Typography gutterBottom variant="h6" component="div">
// //           {album.title}
// //         </Typography>
// //         <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
// //           {album.artist[0].name}
// //         </Typography>
// //       </CardContent>
// //     </CardActionArea>
// //   </Card></div>
// //   )
// // }
