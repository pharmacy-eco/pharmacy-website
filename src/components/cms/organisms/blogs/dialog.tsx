"use client";

import React, { useState, useImperativeHandle, useEffect } from "react";
import DialogForm from "../../atoms/next-dialog/dialog-form";
import InputField from "../../atoms/next-input/input-field";
import { isNullOrEmpty, toSlug } from "@/utils/validate";
import SelectField from "../../atoms/select-atom/select-field";
import { useBlogStore } from "@/stores/blog";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";
import QuillEditor from "../../atoms/quil-editor";
import TextareaRoot from "../../atoms/textarea-atom/textarea-root";

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
  const [slug, setSlug] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [categoryID, setCategoryID] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("2");
  const [createdBy, setCreatedBy] = useState<string>("");
  const [updatedBy, setUpdatedBy] = useState<string>("");
  const [deletedBy, setDeletedBy] = useState<string>("");

  const [titleError, setTitleError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [categoryIDError, setCategoryIDError] = useState<string | null>(null);
  const [metaTitleError, setMetaTitleError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [createdByError, setCreatedByError] = useState<string | null>(null);
  const [updatedByError, setUpdatedByError] = useState<string | null>(null);
  const [deletedByError, setDeletedByError] = useState<string | null>(null);

  const { _fnGetCreateBlog, _fnGetUpdateBlog, _fnGetDetailBlog } = useBlogStore();

  useEffect(() => {
    if (!!id && open && type === "update") {
      _fnGetDetailBlog(id)
        .then((res) => {
          const data = res?.data;
          setTitle(data?.title || "");
          setSlug(data?.slug || "");
          setImage(data?.image || "");
          setCategoryID(String(data?.category_id || ""));
          setDescription(data?.description || "");
          setContent(data?.content || "");
          setMetaTitle(data?.meta_title || "");
          setMetaDescription(data?.meta_description || "");
          setStatus(String(data?.status ?? 2));
          setCreatedBy(String(data?.created_by || ""));
          setUpdatedBy(String(data?.updated_by || ""));
          setDeletedBy(String(data?.deleted_by || ""));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);

  const handleAction = () => {
    if (fnVal()) return;

    const payload: any = {
      title: title,
      slug: slug,
      image: image,
      category_id: Number(categoryID),
      description: description || null,
      content: content || null,
      meta_title: metaTitle,
      meta_description: metaDescription || null,
      status: Number(status),
      created_by: Number(createdBy),
      updated_by: Number(updatedBy),
      deleted_by: Number(deletedBy)
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
    if (isNullOrEmpty(slug) || isNullOrEmpty((slug || "").trim())) {
      hasError = true;
      setSlugError("Vui lòng nhập slug");
    }
    if (isNullOrEmpty(image) || isNullOrEmpty((image || "").trim())) {
      hasError = true;
      setImageError("Vui lòng nhập ảnh");
    }
    if (isNullOrEmpty(categoryID) || isNullOrEmpty((categoryID || "").trim())) {
      hasError = true;
      setCategoryIDError("Vui lòng nhập category_id");
    }
    if (isNullOrEmpty(metaTitle) || isNullOrEmpty((metaTitle || "").trim())) {
      hasError = true;
      setMetaTitleError("Vui lòng nhập meta title");
    }
    if (isNullOrEmpty(status) || isNullOrEmpty((status || "").trim())) {
      hasError = true;
      setStatusError("Vui lòng chọn trạng thái");
    }
    if (isNullOrEmpty(createdBy) || isNullOrEmpty((createdBy || "").trim())) {
      hasError = true;
      setCreatedByError("Vui lòng nhập created_by");
    }
    if (isNullOrEmpty(updatedBy) || isNullOrEmpty((updatedBy || "").trim())) {
      hasError = true;
      setUpdatedByError("Vui lòng nhập updated_by");
    }
    if (isNullOrEmpty(deletedBy) || isNullOrEmpty((deletedBy || "").trim())) {
      hasError = true;
      setDeletedByError("Vui lòng nhập deleted_by");
    }
    return hasError;
  };

  const fnClear = () => {
    setTitle("");
    setSlug("");
    setImage("");
    setCategoryID("");
    setDescription("");
    setContent("");
    setMetaTitle("");
    setMetaDescription("");
    setStatus("2");
    setCreatedBy("");
    setUpdatedBy("");
    setDeletedBy("");

    setTitleError(null);
    setSlugError(null);
    setImageError(null);
    setCategoryIDError(null);
    setMetaTitleError(null);
    setStatusError(null);
    setCreatedByError(null);
    setUpdatedByError(null);
    setDeletedByError(null);
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
        <div className="col-span-12 md:col-span-6">
          <InputField
            name="title"
            label="Tiêu đề"
            value={title}
            error={titleError}
            placeholder="Nhập tiêu đề ..."
            onChange={(evt) => {
              setTitle(evt.target.value);
              setTitleError(null);
              if (isNullOrEmpty(slug)) setSlug(toSlug(evt.target.value));
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            name="slug"
            label="Slug"
            value={slug}
            error={slugError}
            placeholder="nhap-slug"
            onChange={(evt) => {
              setSlug(evt.target.value);
              setSlugError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            name="image"
            label="Ảnh"
            value={image}
            error={imageError}
            placeholder="https://..."
            onChange={(evt) => {
              setImage(evt.target.value);
              setImageError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            name="category_id"
            label="Category ID"
            value={categoryID}
            error={categoryIDError}
            placeholder="Nhập category id ..."
            onChange={(evt) => {
              setCategoryID(evt.target.value);
              setCategoryIDError(null);
            }}
          />
        </div>
        <div className="col-span-12">
          <TextareaRoot
            name="description"
            label="Mô tả ngắn"
            value={description}
            placeholder="Nhập mô tả ngắn ..."
            onChange={(evt) => {
              setDescription(evt.target.value);
            }}
          />
        </div>
        <div className="col-span-12">
          <QuillEditor label="Nội dung" value={content} onChange={setContent} />
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
            placeholder="Nhập meta description ..."
            onChange={(evt) => {
              setMetaDescription(evt.target.value);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <SelectField
            name="status"
            label="Trạng thái"
            value={String(status)}
            error={statusError}
            options={[
              { label: "Khóa", value: "0" },
              { label: "Hoạt động", value: "1" },
              { label: "Chờ duyệt", value: "2" }
            ]}
            onValueChange={(val) => {
              setStatus(val);
              setStatusError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <InputField
            name="created_by"
            label="Created by"
            value={createdBy}
            error={createdByError}
            placeholder="User ID"
            onChange={(evt) => {
              setCreatedBy(evt.target.value);
              setCreatedByError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <InputField
            name="updated_by"
            label="Updated by"
            value={updatedBy}
            error={updatedByError}
            placeholder="User ID"
            onChange={(evt) => {
              setUpdatedBy(evt.target.value);
              setUpdatedByError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <InputField
            name="deleted_by"
            label="Deleted by"
            value={deletedBy}
            error={deletedByError}
            placeholder="User ID"
            onChange={(evt) => {
              setDeletedBy(evt.target.value);
              setDeletedByError(null);
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
