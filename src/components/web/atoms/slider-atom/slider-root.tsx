"use client";

import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ButtonSlider from "../button-atom/button-slider";
import { cn } from "@/lib/utils";

interface IProps extends Settings {
  children?: React.ReactNode;
  gap?: "none" | "sm" | "md" | "lg";
  isBtnCenter?: boolean;
}

const SliderRoot: React.FC<IProps> = ({ isBtnCenter = false, gap = "none", children, ...props }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <ButtonSlider type="next" isCenter={isBtnCenter} />,
    prevArrow: <ButtonSlider type="prev" isCenter={isBtnCenter} />,
    className: cn("slider-root", {
      [`slider-root--${gap}`]: true
    }),
    appendDots: (dots) => (
      <div>
        <ul className="-mt-12 flex justify-center gap-0 [&>li]:!m-0">{dots}</ul>
      </div>
    ),
    ...props
  };

  return <Slider {...settings}>{children}</Slider>;
};

SliderRoot.displayName = "SliderRoot";
export default SliderRoot;
