import React from "react";

const Loader = () => {
  return (
    <div className="loader-cmp flex items-center absolute h-full w-full">
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loader;
