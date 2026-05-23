import React from "react";
import NextImg from "../../atoms/next-img";

interface IProps {}

const HomeFooterImage: React.FC<IProps> = () => {
  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <div className="relative w-full h-[100px] md:h-[145px]">
        <NextImg
          width={1600}
          height={200}
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/chan_trang_desktop_2331700d88.jpg"
          alt="Long Châu"
          className="absolute w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

HomeFooterImage.displayName = "HomeFooterImage";
export default HomeFooterImage;
