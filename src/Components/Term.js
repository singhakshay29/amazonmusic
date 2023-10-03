/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Amazon from "../assests/Amazon.pdf";

export default function Term() {
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
