"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { DynamicIcon } from "../../atoms/dynamic-lucidev";
import BreadcrumbAtom from "../../atoms/breadcrumb-atom";
import { useCommonWeb } from "@/contexts/common-web";

interface IProps {
  children: React.ReactNode;
}

const LayoutBlog: React.FC<IProps> = ({ children }) => {
  const params = useParams();
  const { common } = useCommonWeb();
  const slug = params?.slug || "";
  const dataList = common?.categories.categories_blog || [];
  const dataDetail = dataList.find((x) => x.slug === slug);

  const items = [
    {
      id: 1,
      icon: "pill",
      title: "THUỐC CHÍNH HÃNG",
      description: "đa dạng và chuyên sâu"
    },
    {
      id: 2,
      icon: "package",
      title: "ĐỔI TRẢ TRONG 30 NGÀY",
      description: "đa dạng và chuyên sâu"
    },
    {
      id: 3,
      icon: "shield-check",
      title: "CAM KẾT 100%",
      description: "đa dạng và chuyên sâu"
    },
    {
      id: 4,
      icon: "ambulance",
      title: "MIỄN PHÍ VẬN CHUYỂN",
      description: "đa dạng và chuyên sâu"
    }
  ];

  return (
    <div className="w-full h-auto">
      <div className="container">
        <div className="py-3">
          <BreadcrumbAtom
            list={[
              {
                label: "Trang Chủ",
                href: "/"
              },
              {
                label: dataDetail?.title || ""
              }
            ]}
          />
        </div>
      </div>
      <div className="w-full h-auto bg-white pt-6">
        <div className="container">
          <div className="grid gap-6 grid-cols-12">
            <div className="col-span-12 md:col-span-3">
              <div className="w-full h-auto flex flex-col border border-[#f6f7f9] rounded-xl overflow-hidden">
                <div className="flex gap-4 items-center px-4 py-[10px] bg-[#f6f7f9]">
                  <DynamicIcon name="menu" className="w-5 h-5 stroke-[#657384]" />
                  <h4 className="text-sm text-[#657384] font-medium">Bài viết trong danh mục</h4>
                </div>
                <div className="flex flex-col">
                  {!!dataList &&
                    dataList.map((x, idx) => {
                      return (
                        <Link
                          key={idx}
                          href={"/bai-dang/" + x.slug}
                          className={cn(
                            "items-center px-4 py-3 text-sm text-[#4a4f63] font-medium line-clamp-1 transition-all duration-200 hover:font-semibold hover:bg-[#eaeffa]",
                            {
                              "bg-[#eaeffa]": x.slug === slug
                            }
                          )}
                        >
                          <span className="line-clamp-1">{x.title}</span>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">{children}</div>
            <div className="col-span-12 md:col-span-3"></div>
          </div>
        </div>
        <div className="container">
          <div className="grid grid-cols-12 gap-4 md:gap-6 py-4 md:py-12">
            {items.map((x, idx) => {
              return (
                <div
                  key={idx}
                  className="col-span-12 md:col-span-6 lg:col-span-3 w-full h-auto px-1 py-3 flex gap-4 items-center justify-center md:justify-start"
                >
                  <div className="inline-flex items-center justify-center">
                    <DynamicIcon name={x.icon} className="w-8 md:w-10 h-8 md:h-10 stroke-blue-12" />
                  </div>
                  <div className="flex flex-col gap-0">
                    <h4 className="text-sm md:text-base font-semibold text-left md:text-center text-blue-12 m-0 p-0">
                      {x.title}
                    </h4>
                    <p className="text-[13px] md:text-sm font-normal text-left md:text-center text-black-02 m-0 p-0">
                      {x.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

LayoutBlog.displayName = "LayoutBlog";
export default LayoutBlog;
