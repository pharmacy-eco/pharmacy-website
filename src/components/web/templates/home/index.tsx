import React from "react";
import HomeSlider from "../../organisms/home/home-slider";
import HomeUtilities from "../../organisms/home/home-utilities";
import HomeFeaturedProduct from "../../organisms/home/home-featured-product";
import HomeFeaturedCategories from "../../organisms/home/home-featured-categories";
import HomeFeaturedBrand from "../../organisms/home/home-featured-brand";
import HomeProgram from "../../organisms/home/home-program";
import HomeHealthCenter from "../../organisms/home/home-health-center";
import HomeFooterImage from "../../organisms/home/home-footer-image";
import { IHome } from "@/types/web/common";

interface IProps {
  data: IHome | null;
}

const THome: React.FC<IProps> = ({ data }) => {
  return (
    <div className="w-full h-auto">
      <div className="container">
        <HomeSlider banners={data?.banner || []} />
        <HomeUtilities />
        <HomeFeaturedProduct products={data?.product || []} />
        <HomeFeaturedCategories categories={data?.category || []} />
        <HomeFeaturedBrand brands={data?.brands || []} />
        <HomeProgram />
        <HomeHealthCenter blogs={data?.blogs || []} />
      </div>
      <HomeFooterImage />
    </div>
  );
};

THome.displayName = "THome";
export default THome;
