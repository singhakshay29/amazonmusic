import { AppBar, Toolbar, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Searchbar({
  handleNotShowSearch,
  handleShowNav,
  handleTextToSearch,
  searchItem,
}) {
  return (
    <>
      <AppBar style={{ background: "transparent", position: "fixed" }}>
        <Toolbar className="sbar" style={{ backgroundColor: "none" }}>
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Link to="/searchcomponents">
              <input
                onChange={handleTextToSearch}
                value={searchItem}
                className="sbarI"
                placeholder="Search"></input>
            </Link>
            <Link to="/searchpage">
              <button
                onClick={() => {
                  handleNotShowSearch();
                  handleShowNav();
                }}
                className="sbarb">
                CANCEL
              </button>
            </Link>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
<>
  {/* {isDropdownOpenSearch && (
                      <Card
                        sx={{
                          mt: "3rem",
                          position: "absolute",
                          top: "8%",
                          left: "48%",
                          zIndex: 1,
                          width: "200px",
                          backgroundColor: "rgba(15,17,17,.7)",
                          border: "0.5px solid grey",
                          borderRadius: "10px",
                        }}>
                        <ListItem>
                          <Link to="/searchcomponents">
                            <Card style={{ display: "flex" }}>
                              <InputBase
                                onChange={handleTextToSearch}
                                placeholder="Search..."
                                value={searchItem}
                                style={{
                                  flex: 1,
                                  height: "30px",
                                  backgroundColor: "white",
                                  borderRadius: "10px",
                                  marginTop: "5px",
                                }}
                              />
                              <IconButton
                                style={{
                                  padding: "6px",
                                  background: "white",
                                }}>
                                <SearchIcon
                                  onClick={handleInputValueToSearch}
                                />
                              </IconButton>
                            </Card>
                          </Link>
                        </ListItem>
                      </Card>
                    )} */}
</>;
