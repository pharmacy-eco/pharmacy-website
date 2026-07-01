"use client";

import React, { useEffect, useState } from "react";
import { useGeneralStore } from "@/stores/general";
import CardRoot from "../../atoms/card-atom/card-root";
import { IGeneral, ISocial } from "@/types/cms/general";
import InputField from "../../atoms/next-input/input-field";
import TextareaRoot from "../../atoms/textarea-atom/textarea-root";
import SocialForm from "../../molecules/social-form";
import ButtonRoot from "../../atoms/button-atom/button-root";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";

interface IProps {}

const getGeneralData = (res: any): IGeneral | undefined => {
  const data = res?.data;

  if (Array.isArray(data)) return data[0];
  if (Array.isArray(data?.general)) return data.general[0];
  if (Array.isArray(data?.items)) return data.items[0];

  return data;
};

const normalizeSocial = (social?: IGeneral["social"]): ISocial[] => {
  if (!Array.isArray(social)) return [];

  return social.map((item) => {
    if (typeof item === "string") {
      return {
        image: "",
        name: "",
        link: item
      };
    }

    return item;
  });
};

const buildPayload = (data?: IGeneral): IGeneral => ({
  company: data?.company || "",
  link_map: data?.link_map || "",
  iframe_map: data?.iframe_map || "",
  info: data?.info || "",
  hotline: data?.hotline || "",
  address: data?.address || "",
  email: data?.email || "",
  logo: data?.logo || "",
  favicon: data?.favicon || "",
  social: normalizeSocial(data?.social)
    .map((item) => item.link)
    .filter(Boolean),
  add_body: data?.add_body || "",
  meta_title: data?.meta_title || "",
  meta_keyword: data?.meta_keyword || "",
  meta_description: data?.meta_description || ""
});

const TInfo: React.FC<IProps> = () => {
  const [data, setData] = useState<IGeneral>();
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [companyError, setCompanyError] = useState<string | null>(null);

  const { _fnGetDetailGeneral, _fnGetUpdateGeneral } = useGeneralStore();

  useEffect(() => {
    fnFetchData();
  }, []);

  const fnFetchData = () => {
    setLoading(true);
    _fnGetDetailGeneral()
      .then((res) => {
        setData(getGeneralData(res));
      })
      .catch((error) => {
        console.log(error);
        sonner({
          type: "error",
          message: "Không thể lấy dữ liệu thông tin chung"
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = () => {
    if (!data?.id) {
      sonner({
        type: "error",
        message: "Không tìm thấy ID cấu hình chung"
      });
      return;
    }

    if (!data.company?.trim()) {
      setCompanyError("Vui lòng nhập tên cửa hàng");
      return;
    }

    setSaving(true);
    _fnGetUpdateGeneral(data.id, buildPayload(data))
      .then(() => {
        fnFetchData();
        sonner({
          type: "success",
          message: "Cập nhật thông tin chung thành công"
        });
      })
      .catch((error) => {
        console.log(error);
        sonner({
          type: "error",
          message: common["error.sonner.500"]
        });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <CardRoot>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-medium">Thông tin chung</h2>
        <ButtonRoot loading={saving || loading} disabled={loading} onClick={handleSave}>
          Lưu thay đổi
        </ButtonRoot>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex flex-col gap-4 md:col-span-6">
          <InputField
            name="company"
            label="Tên cửa hàng"
            value={data?.company || ""}
            error={companyError}
            placeholder="Nhập tên cửa hàng..."
            onChange={(evt) => {
              setData({ ...data, company: evt.target.value });
              setCompanyError(null);
            }}
          />
          <InputField
            name="address"
            label="Địa chỉ"
            value={data?.address || ""}
            placeholder="Nhập địa chỉ ..."
            onChange={(evt) => {
              setData({ ...data, address: evt.target.value });
            }}
          />
          <InputField
            name="hotline"
            label="Hotline"
            value={data?.hotline || ""}
            onChange={(evt) => {
              setData({ ...data, hotline: evt.target.value });
            }}
          />
          <InputField
            name="email"
            label="Email"
            value={data?.email || ""}
            onChange={(evt) => {
              setData({ ...data, email: evt.target.value });
            }}
          />
          <InputField
            name="logo"
            label="Logo URL"
            value={data?.logo || ""}
            placeholder="https://..."
            onChange={(evt) => {
              setData({ ...data, logo: evt.target.value });
            }}
          />
          <InputField
            name="favicon"
            label="Favicon URL"
            value={data?.favicon || ""}
            placeholder="https://..."
            onChange={(evt) => {
              setData({ ...data, favicon: evt.target.value });
            }}
          />
          <TextareaRoot
            name="info"
            label="Thông tin"
            value={data?.info || ""}
            onChange={(evt) => {
              setData({ ...data, info: evt.target.value });
            }}
          />
          <SocialForm
            label="mạng xã hội"
            items={normalizeSocial(data?.social)}
            onChange={(val) => setData({ ...data, social: val })}
          />
        </div>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-6">
          <InputField
            name="link_map"
            label="Link map"
            value={data?.link_map || ""}
            onChange={(evt) => {
              setData({ ...data, link_map: evt.target.value });
            }}
          />
          <TextareaRoot
            name="iframe_map"
            label="Iframe map"
            value={data?.iframe_map || ""}
            onChange={(evt) => {
              setData({ ...data, iframe_map: evt.target.value });
            }}
          />
          <InputField
            name="meta_title"
            label="Meta title"
            value={data?.meta_title || ""}
            placeholder="Nhập meta title ..."
            onChange={(evt) => {
              setData({ ...data, meta_title: evt.target.value });
            }}
          />
          <InputField
            name="meta_keyword"
            label="Meta keyword"
            value={data?.meta_keyword || ""}
            placeholder="Nhập meta keyword ..."
            onChange={(evt) => {
              setData({ ...data, meta_keyword: evt.target.value });
            }}
          />
          <TextareaRoot
            name="meta_description"
            label="Meta description"
            value={data?.meta_description || ""}
            placeholder="Nhập meta description ..."
            onChange={(evt) => {
              setData({ ...data, meta_description: evt.target.value });
            }}
          />
          <TextareaRoot
            name="add_body"
            label="Thẻ chèn body"
            value={data?.add_body || ""}
            placeholder="Nhập thẻ chèn body ..."
            onChange={(evt) => {
              setData({ ...data, add_body: evt.target.value });
            }}
          />
        </div>
      </div>
    </CardRoot>
  );
};

TInfo.displayName = "TInfo";
export default TInfo;
