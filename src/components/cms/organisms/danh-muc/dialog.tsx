"use client";

import React, { useState, useImperativeHandle, useEffect } from "react";
import DialogForm from "../../atoms/next-dialog/dialog-form";
import InputField from "../../atoms/next-input/input-field";
import { isNullOrEmpty } from "@/utils/validate";
import SelectField from "../../atoms/select-atom/select-field";
import { useCategoryStore } from "@/stores/category";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";
import TextareaRoot from "../../atoms/textarea-atom/textarea-root";
import DropzoneImageUpload from "../../atoms/upload/dropzone-image-upload";

interface IProps {
  onSuccess: () => void;
}

interface IRef {
  _onType: (_: "create" | "update") => void;
  _setID: (_: number | undefined) => void;
  onOpen: () => void;
  onClose: () => void;
}

const DialogCategories = React.forwardRef<IRef, IProps>(({ onSuccess }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<"create" | "update">("create");
  const [loading, setLoading] = useState<boolean>(false);

  const [id, setID] = useState<number>();
  const [name, setName] = useState<string>("");
  const [parentID, setParentID] = useState<string | null>("");
  const [status, setStatus] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [metaName, setMetaName] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [typeCategory, setTypeCategory] = useState<"PRODUCT" | "BLOG" | "BRAND">("PRODUCT");

  const [nameError, setNameError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [metaNameError, setMetaNameError] = useState<string | null>(null);
  const [metaDescriptionError, setMetaDescriptionError] = useState<string | null>(null);
  const [typeCategoryError, setTypeCategoryError] = useState<string | null>(null);

  const { _fnGetCreateCategory, _fnGetUpdateCategory, _fnGetDetailCategory } = useCategoryStore();

  useEffect(() => {
    if (!!id && open && type === "update") {
      _fnGetDetailCategory(id)
        .then((res) => {
          const data = res?.data;
          setName(data?.name || "");
          setImage(data?.image || "");
          setStatus(String(data?.status) || "");
          setParentID(String(data?.parent?.id) || null);
          setDescription(data?.description || "");
          setTypeCategory(data?.type || "PRODUCT");
          setMetaName(data?.meta_name || "");
          setMetaDescription(data?.meta_description || "");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);

  const handleAction = () => {
    if (fnVal()) return;
    const payload = {
      name: name,
      image: image || "",
      type: typeCategory,
      description: description,
      status: Number(status),
      parent_id: parentID ? Number(parentID) : null,
      meta_name: metaName,
      meta_description: metaDescription
    };
    setLoading(true);
    if (type === "create") {
      _fnGetCreateCategory(payload)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Tạo danh mục thành công"
          });
        })
        .catch(() => {
          sonner({
            type: "error",
            message: common["error.sonner.500"]
          });
        })
        .finally(() => {
          setOpen(false);
          setLoading(false);
        });
    } else {
      _fnGetUpdateCategory(id, payload)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Cập nhật danh mục thành công"
          });
        })
        .catch(() => {
          sonner({
            type: "error",
            message: common["error.sonner.500"]
          });
        })
        .finally(() => {
          setOpen(false);
          setLoading(false);
        });
    }
  };

  const fnVal = () => {
    let hasError = false;
    if (isNullOrEmpty(name) || isNullOrEmpty((name || "").trim())) {
      hasError = true;
      setNameError("Vui lòng nhập danh mục");
    }
    if (isNullOrEmpty(description) || isNullOrEmpty((description || "").trim())) {
      hasError = true;
      setDescriptionError("Vui lòng nhập mô tả");
    }
    if (isNullOrEmpty(metaName) || isNullOrEmpty((metaName || "").trim())) {
      hasError = true;
      setMetaNameError("Vui lòng nhập dữ cho thẻ meta");
    }
    if (isNullOrEmpty(metaDescription) || isNullOrEmpty((metaDescription || "").trim())) {
      hasError = true;
      setMetaDescriptionError("Vui lòng nhập dữ cho thẻ meta");
    }
    if (isNullOrEmpty(status) || isNullOrEmpty((status || "").trim())) {
      hasError = true;
      setStatusError("Vui lòng chọn trạng thái");
    }
    return hasError;
  };

  const fnClear = () => {
    setName("");
    setImage("");
    setStatus("");
    setParentID(null);
    setMetaName("");
    setDescription("");
    setMetaDescription("");

    setNameError(null);
    setStatusError(null);
    setDescriptionError(null);
    setMetaNameError(null);
    setMetaDescriptionError(null);
  };

  useImperativeHandle(ref, () => ({
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    _onType: (val) => setType(val),
    _setID: (id) => setID(id)
  }));

  return (
    <DialogForm
      open={open}
      className="w-[800px] max-w-full"
      title={type === "create" ? "Tạo mới danh mục" : "Cập nhật danh mục"}
      textAction={type === "create" ? "Tạo mới" : "Cập nhật"}
      loadingAction={loading}
      onToggle={(val) => {
        setOpen(val);
        fnClear();
      }}
      onAction={handleAction}
    >
      <div className="flex gap-4">
        <div className="flex-1 w-full flex flex-col gap-4">
          <InputField
            name="name"
            label="Danh mục"
            value={name}
            error={nameError}
            placeholder="Nhập danh mục ..."
            onChange={(evt) => {
              setName(evt.target.value);
              setNameError(null);
            }}
          />
          <InputField
            name="meta_name"
            label="Meta name"
            value={metaName}
            error={metaNameError}
            placeholder="Nhập meta name ..."
            onChange={(evt) => {
              setMetaName(evt.target.value);
              setMetaNameError(null);
            }}
          />
          <InputField
            name="meta_description"
            label="Meta description"
            value={metaDescription}
            error={metaDescriptionError}
            placeholder="Nhập meta description ..."
            onChange={(evt) => {
              setMetaDescription(evt.target.value);
              setMetaDescriptionError(null);
            }}
          />
          <TextareaRoot
            name="description"
            label="Mô tả"
            value={description}
            error={descriptionError}
            placeholder="Nhập mô tả ..."
            onChange={(evt) => {
              setDescription(evt.target.value);
              setDescriptionError(null);
            }}
          />
          <SelectField
            name="parent_id"
            label="Cấp cha"
            value={parentID as any}
            options={[
              {
                label: "Cấp 1",
                value: "1"
              },
              {
                label: "Cấp 2",
                value: "0"
              }
            ]}
            placeholder="-- Chọn cấp cha --"
            onValueChange={setParentID}
          />
          <SelectField
            name="status"
            label="Trạng thái"
            value={String(status)}
            error={statusError}
            options={[
              {
                label: "Hoạt động",
                value: "1"
              },
              {
                label: "Khóa",
                value: "0"
              }
            ]}
            onValueChange={(val) => {
              setStatus(val);
              setStatusError(null);
            }}
          />
          <SelectField
            name="type"
            label="Loại danh mục"
            value={typeCategory}
            error={statusError}
            options={[
              {
                label: "Sản phẩm",
                value: "PRODUCT"
              },
              {
                label: "Bài viết",
                value: "BLOG"
              },
              {
                label: "Thương hiệu",
                value: "BRAND"
              }
            ]}
            onValueChange={(val) => {
              setTypeCategory(val as "PRODUCT" | "BLOG" | "BRAND");
              setTypeCategoryError(null);
            }}
          />
        </div>
        <div className="flex-1 w-full">
          <DropzoneImageUpload
            maxFiles={1}
            listPreview={image ? [image] : []}
            onChange={(urls) => {
              setImage(urls[0] || "");
            }}
          />
        </div>
      </div>
    </DialogForm>
  );
});

DialogCategories.displayName = "DialogCategories";
export type { IRef };
export default DialogCategories;
