import React from "react";
import { Card } from "@mui/material";

export default function NoResultsFound({ searchItem }) {
  return (
    <Card className="noresult">
      <h1>No results found for</h1>
      <h1>{searchItem}</h1>
    </Card>
  );
}
