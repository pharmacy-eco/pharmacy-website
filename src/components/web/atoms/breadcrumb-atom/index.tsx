import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

interface IProps {
  list: Array<{ label: string; href?: string | null | undefined }>;
}

const BreadcrumbAtom: React.FC<IProps> = ({ list }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {list?.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href || "/"} className="text-blue-12 hover:text-blue-12">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {list.length - 1 > idx && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbAtom;
