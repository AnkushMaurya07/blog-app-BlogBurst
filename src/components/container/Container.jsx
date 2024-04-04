import React from "react";

const Container = ({ children }) => {
  return (
    <div className="w-full max-w-8xl mx-auto px-4 ">
      {children}
    </div>
  );
};

export default Container;
