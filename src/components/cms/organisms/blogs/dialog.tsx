"use client";

import React, { useState, useImperativeHandle, useEffect } from "react";
import DialogForm from "../../atoms/next-dialog/dialog-form";
import InputField from "../../atoms/next-input/input-field";
import { isNullOrEmpty } from "@/utils/validate";
import SelectField from "../../atoms/select-atom/select-field";
import SearchableSelectField from "../../atoms/select-atom/searchable-select-field";
import { useBlogStore } from "@/stores/blog";
import { useCategoryStore } from "@/stores/category";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";
import QuillEditor from "../../atoms/quil-editor";
import TextareaRoot from "../../atoms/textarea-atom/textarea-root";
import { IBlogPayload } from "@/types/cms/blog";
import { ICategory } from "@/types/cms/category";
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

const DialogBlogs = React.forwardRef<IRef, IProps>(({ onSuccess }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<"create" | "update">("create");
  const [loading, setLoading] = useState<boolean>(false);

  const [id, setID] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [categoryID, setCategoryID] = useState<string>("");
  const [lstCategory, setListCategory] = useState<{ value: string; label: string }[]>([]);
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("1");

  const [titleError, setTitleError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [categoryIDError, setCategoryIDError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [metaTitleError, setMetaTitleError] = useState<string | null>(null);
  const [metaDescriptionError, setMetaDescriptionError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  const { _fnGetCreateBlog, _fnGetUpdateBlog, _fnGetDetailBlog } = useBlogStore();
  const { _fnGetListCategory } = useCategoryStore();

  const getDetailCategoryID = (data: any) => {
    if (data?.category_id) return String(data.category_id);
    if (data?.category?.id) return String(data.category.id);

    return "";
  };

  useEffect(() => {
    if (open) fnFetchListCategory();
  }, [open]);

  useEffect(() => {
    if (!!id && open && type === "update") {
      _fnGetDetailBlog(id)
        .then((res) => {
          const data = res?.data;
          setTitle(data?.title || "");
          setImage(data?.image || "");
          setCategoryID(getDetailCategoryID(data));
          setDescription(data?.description || "");
          setContent(data?.content || "");
          setMetaTitle(data?.meta_title || "");
          setMetaDescription(data?.meta_description || "");
          setStatus(String(data?.status ?? 1));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);

  const fnFetchListCategory = () => {
    const params = new URLSearchParams({
      pageSize: "1000",
      pageIndex: "1"
    }).toString();

    _fnGetListCategory(params)
      .then((res) => {
        const categories = res?.data.items || [];
        const blogCategories = categories.filter((item: ICategory) => item.type === "BLOG");
        const items = (blogCategories.length > 0 ? blogCategories : categories)
          .filter((item: ICategory) => !!item.id)
          .map((item: ICategory) => ({
            label: item.name,
            value: String(item.id)
          }));

        setListCategory(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAction = () => {
    if (fnVal()) return;

    const payload: IBlogPayload = {
      title: title,
      image: image,
      category_id: Number(categoryID),
      description: description,
      content: content,
      meta_title: metaTitle,
      meta_description: metaDescription,
      status: Number(status)
    };

    setLoading(true);
    if (type === "create") {
      _fnGetCreateBlog(payload)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Tạo bài viết thành công"
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
      _fnGetUpdateBlog(id, payload)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Cập nhật bài viết thành công"
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
    if (isNullOrEmpty(title) || isNullOrEmpty((title || "").trim())) {
      hasError = true;
      setTitleError("Vui lòng nhập tiêu đề");
    }
    if (isNullOrEmpty(image) || isNullOrEmpty((image || "").trim())) {
      hasError = true;
      setImageError("Vui lòng tải ảnh");
    }
    if (isNullOrEmpty(categoryID) || isNullOrEmpty((categoryID || "").trim())) {
      hasError = true;
      setCategoryIDError("Vui lòng chọn danh mục");
    }
    if (isNullOrEmpty(description) || isNullOrEmpty((description || "").trim())) {
      hasError = true;
      setDescriptionError("Vui lòng nhập mô tả ngắn");
    }
    if (isNullOrEmpty(content) || isNullOrEmpty((content || "").trim())) {
      hasError = true;
      setContentError("Vui lòng nhập nội dung");
    }
    if (isNullOrEmpty(metaTitle) || isNullOrEmpty((metaTitle || "").trim())) {
      hasError = true;
      setMetaTitleError("Vui lòng nhập meta title");
    }
    if (isNullOrEmpty(metaDescription) || isNullOrEmpty((metaDescription || "").trim())) {
      hasError = true;
      setMetaDescriptionError("Vui lòng nhập meta description");
    }
    if (isNullOrEmpty(status) || isNullOrEmpty((status || "").trim())) {
      hasError = true;
      setStatusError("Vui lòng chọn trạng thái");
    }
    return hasError;
  };

  const fnClear = () => {
    setTitle("");
    setImage("");
    setCategoryID("");
    setDescription("");
    setContent("");
    setMetaTitle("");
    setMetaDescription("");
    setStatus("1");

    setTitleError(null);
    setImageError(null);
    setCategoryIDError(null);
    setDescriptionError(null);
    setContentError(null);
    setMetaTitleError(null);
    setMetaDescriptionError(null);
    setStatusError(null);
  };

  useImperativeHandle(ref, () => ({
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    _onType: (val) => setType(val),
    _setID: (value) => setID(value)
  }));

  return (
    <DialogForm
      open={open}
      className="w-[960px] max-w-full max-h-[90vh] overflow-y-auto"
      title={type === "create" ? "Tạo mới bài viết" : "Cập nhật bài viết"}
      textAction={type === "create" ? "Tạo mới" : "Cập nhật"}
      loadingAction={loading}
      onToggle={(val) => {
        setOpen(val);
        fnClear();
      }}
      onAction={handleAction}
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <InputField
            name="title"
            label="Tiêu đề"
            value={title}
            error={titleError}
            placeholder="Nhập tiêu đề ..."
            onChange={(evt) => {
              setTitle(evt.target.value);
              setTitleError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <SearchableSelectField
            name="category_id"
            label="Danh mục"
            value={categoryID}
            error={categoryIDError}
            options={lstCategory}
            placeholder="-- Chọn danh mục --"
            searchPlaceholder="Tìm danh mục..."
            onValueChange={(val) => {
              setCategoryID(val);
              setCategoryIDError(null);
            }}
          />
        </div>
        <div className="col-span-12">
          <DropzoneImageUpload
            maxFiles={1}
            label="Ảnh"
            listPreview={image ? [image] : []}
            error={imageError}
            onChange={(urls) => {
              setImage(urls[0] || "");
              setImageError(null);
            }}
          />
        </div>
        <div className="col-span-12">
          <TextareaRoot
            name="description"
            label="Mô tả ngắn"
            value={description}
            error={descriptionError}
            placeholder="Nhập mô tả ngắn ..."
            onChange={(evt) => {
              setDescription(evt.target.value);
              setDescriptionError(null);
            }}
          />
        </div>
        <div className="col-span-12">
          <QuillEditor label="Nội dung" value={content} onChange={setContent} />
          {contentError && <p className="mt-1 text-[13px] text-red-400">{contentError}</p>}
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            name="meta_title"
            label="Meta title"
            value={metaTitle}
            error={metaTitleError}
            placeholder="Nhập meta title ..."
            onChange={(evt) => {
              setMetaTitle(evt.target.value);
              setMetaTitleError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
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
        </div>
        <div className="col-span-12 md:col-span-4">
          <SelectField
            name="status"
            label="Trạng thái"
            value={String(status)}
            error={statusError}
            options={[
              { label: "Hoạt động", value: "1" },
              { label: "Khóa", value: "2" }
            ]}
            onValueChange={(val) => {
              setStatus(val);
              setStatusError(null);
            }}
          />
        </div>
      </div>
    </DialogForm>
  );
});

DialogBlogs.displayName = "DialogBlogs";
export type { IRef };
export default DialogBlogs;
