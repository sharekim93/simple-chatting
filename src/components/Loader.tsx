import React from "react";
import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <CgSpinner className="w-20 h-10 animate-spin" />
    </div>
  );
};

export default Loader;
