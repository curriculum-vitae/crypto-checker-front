import React from "react";

const URL = "/images/bg.jpg";

export const Wallpaper = () => (
  <div
    style={{
      backgroundImage: `url("${URL}")`,
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: "100%"
    }}
  />
);
