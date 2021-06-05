import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
const Progress = ({ size, smallerSpinner }) => {
  return (
    <>
      {smallerSpinner ? (
        <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <CircularProgress thickness={2} color="primary" size={size} />
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <CircularProgress thickness={2} color="primary" size={size} />
        </div>
      )}
    </>
  );
};

export default Progress;
