/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import Amazon from "../assests/Amazon.pdf";

export default function Term({ handleNotShow }) {
  useEffect(() => {
    handleNotShow();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div style={{ marginTop: "-4rem" }}>
        <object
          style={{
            width: "100%",
            height: "108vh",
          }}
          data={Amazon}
          type="application/pdf"></object>
      </div>
    </>
  );
}
