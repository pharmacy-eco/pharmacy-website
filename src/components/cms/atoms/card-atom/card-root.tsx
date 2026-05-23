"use client";

import React from "react";

interface IProps {
  children?: React.ReactNode;
}

const CardRoot: React.FC<IProps> = ({ children }) => {
  return (
    <div className="px-6 py-5 bg-white rounded-xl">
      <div className="">{children}</div>
    </div>
  );
};

export default CardRoot;
