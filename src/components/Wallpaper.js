import React from "react";

const URL =
  "https://images.unsplash.com/photo-1532335691483-50ac92765105?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b0e83fe0b97dc363bf60caad034d2a3e&w=1000&q=80";

export const Wallpaper = () => (
  <div
    style={{
      backgroundImage: `url("${URL}")`,
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundSize: "poster",
      height: "400px"
    }}
  />
);
