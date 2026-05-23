"use client";

import React from "react";

interface IProps {
  content: string;
}

const ProductDescription: React.FC<IProps> = ({ content }: IProps) => {
  return <div className="md:col-span-9" dangerouslySetInnerHTML={{ __html: content }}></div>;
};

ProductDescription.displayName = "ProductDescription";
export default ProductDescription;
