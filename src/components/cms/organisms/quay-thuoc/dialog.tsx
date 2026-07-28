"use client";

import React, { useState, useImperativeHandle, useEffect } from "react";
import DialogForm from "../../atoms/next-dialog/dialog-form";
import InputField from "../../atoms/next-input/input-field";
import { isNullOrEmpty } from "@/utils/validate";
import SelectField from "../../atoms/select-atom/select-field";
import { useCategoryStore } from "@/stores/category";
import { useProductStore } from "@/stores/product";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";
import { ICategory } from "@/types/cms/category";
import { IProperty } from "@/types/cms/product";
import FeatureForm from "../../molecules/feature-form";
import QuillEditor from "../../atoms/quil-editor";
import DropzoneImageUpload from "../../atoms/upload/dropzone-image-upload";
import SearchableSelectField from "../../atoms/select-atom/searchable-select-field";
import { useProductionBatchStore } from "@/stores/production-batch";
import { IProductionBatch } from "@/types/cms/production-batch";

interface IProps {
  onSuccess: () => void;
}

interface IRef {
  _onType: (_: "create" | "update") => void;
  _setID: (_: number | undefined) => void;
  onOpen: () => void;
  onClose: () => void;
}

const DialogProducts = React.forwardRef<IRef, IProps>(({ onSuccess }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<"create" | "update">("create");
  const [loading, setLoading] = useState<boolean>(false);

  const [id, setID] = useState<number>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [isHot, setIsHot] = useState<string>("0");
  const [categoryID, setCategoryID] = useState<string>("");
  const [productionBatchID, setProductionBatchID] = useState<string>("");
  const [property, setProperty] = useState<IProperty[]>([]);
  const [lstCategory, setListCategory] = useState<{ value: string; label: string }[] | []>([]);
  const [productionBatchOptions, setProductionBatchOptions] = useState<{ value: string; label: string }[]>([]);

  const [status, setStatus] = useState<string>("1");
  const [image, setImage] = useState<string[]>([]);
  const [unit, setUnit] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [metaName, setMetaName] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [productionBatchError, setProductionBatchError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [metaNameError, setMetaNameError] = useState<string | null>(null);
  const [metaDescriptionError, setMetaDescriptionError] = useState<string | null>(null);

  const { _fnGetListCategory } = useCategoryStore();
  const { _fnGetCreateProduct, _fnGetUpdateProduct, _fnGetDetailProduct } = useProductStore();
  const { _fnGetListProductionBatch } = useProductionBatchStore();

  const getDetailCategoryID = (data: any) => {
    if (Array.isArray(data?.category_id)) return String(data.category_id[0] || "");
    if (data?.category_id) return String(data.category_id);
    if (Array.isArray(data?.category)) {
      const category = data.category[0];
      return String(typeof category === "object" ? category?.id || "" : category || "");
    }
    if (data?.category?.id) return String(data.category.id);

    return "";
  };

  const getDetailOptionals = (data: any): IProperty[] => {
    const optionals = data?.optionals || data?.property || [];

    if (Array.isArray(optionals)) return optionals;
    if (typeof optionals === "object") {
      return Object.entries(optionals).map(([name, value]) => ({
        name,
        value: String(value)
      }));
    }

    return [];
  };

  const getDetailImages = (data: any): string[] => {
    const toUrls = (value: any): string[] => {
      if (!value) return [];
      if (typeof value === "string") return value.trim() ? [value] : [];
      if (Array.isArray(value)) {
        return value
          .map((item) => {
            if (typeof item === "string") return item;
            return item?.url || item?.image || item?.src || "";
          })
          .filter(Boolean);
      }

      return [];
    };

    return [
      ...toUrls(data?.image),
      ...toUrls(data?.images),
      ...toUrls(data?.productImage),
      ...toUrls(data?.productImages),
      ...toUrls(data?.product_image)
    ].filter((url, index, items) => items.indexOf(url) === index);
  };

  useEffect(() => {
    if (open) {
      fnFetchListCategory();
      fnFetchListProductionBatch();
    }
  }, [open]);

  useEffect(() => {
    if (!!id && open && type === "update") {
      _fnGetDetailProduct(id)
        .then((res) => {
          const data = res?.data;
          setName(data?.name || "");
          setStatus(String(data?.status ?? "1"));
          setCategoryID(getDetailCategoryID(data));
          const detailProductionBatchID = String(data?.production_batch_id || data?.production_batch?.id || "");
          const detailProductionBatchName = data?.production_batch?.name;
          setProductionBatchID(detailProductionBatchID);
          if (detailProductionBatchID && detailProductionBatchName) {
            setProductionBatchOptions((prev) => {
              if (prev.some((option) => option.value === detailProductionBatchID)) return prev;
              return [...prev, { value: detailProductionBatchID, label: detailProductionBatchName }];
            });
          }
          setProperty(getDetailOptionals(data));
          setDescription(data?.description || "");
          setContent(data?.content || "");
          setImage(getDetailImages(data));
          setPrice(data?.price || 0);
          setCurrentPrice(data?.current_price ?? data?.price ?? 0);
          setIsHot(String(data?.is_hot ?? "0"));
          setUnit(data?.unit || "");
          setMetaName(data?.meta_name || "");
          setMetaDescription(data?.meta_description || "");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, open, type]);

  const fnFetchListCategory = () => {
    _fnGetListCategory("") //TODO: Update api category select
      .then((res) => {
        const items =
          res?.data.items.map((item: ICategory) => ({
            label: item.name,
            value: String(item.id)
          })) || [];
        setListCategory(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fnFetchListProductionBatch = () => {
    const params = new URLSearchParams({
      status: "1",
      pageIndex: "1",
      pageSize: "1000",
      "sort[field]": "expiration_date",
      "sort[order]": "asc"
    });

    _fnGetListProductionBatch(params.toString())
      .then((res) => {
        const options = (res.data.items || []).map((item: IProductionBatch) => ({
          label: `${item.name} - HSD ${item.expiration_date} - SL ${item.quantity.toLocaleString("vi-VN")}`,
          value: String(item.id)
        }));
        setProductionBatchOptions((prev) => {
          const selectedOption = prev.find((option) => option.value === productionBatchID);
          if (!selectedOption || options.some((option) => option.value === selectedOption.value)) return options;
          return [...options, selectedOption];
        });
      })
      .catch((error) => {
        console.log(error);
        setProductionBatchOptions([]);
      });
  };

  const handleAction = () => {
    if (fnVal()) return;
    const imageUrls = image.map((url) => url.trim()).filter(Boolean);
    const categoryIds = categoryID ? [Number(categoryID)] : [];
    const payload = {
      name: name,
      price: price,
      current_price: currentPrice || price,
      is_hot: Number(isHot),
      unit: unit,
      image: imageUrls,
      category: categoryIds,
      description: description,
      content: content,
      meta_name: metaName,
      meta_description: metaDescription,
      optionals: property,
      production_batch_id: Number(productionBatchID),
      status: Number(status)
    };
    setLoading(true);
    if (type === "create") {
      _fnGetCreateProduct(payload)
        .then((response) => {
          if (response?.error?.code !== 201) {
            throw new Error(response?.error?.message || "Không thể tạo sản phẩm");
          }
          onSuccess();
          fnClear();
          setOpen(false);
          sonner({
            type: "success",
            message: "Tạo sản phẩm thành công"
          });
        })
        .catch((error) => {
          sonner({
            type: "error",
            message: error?.message || common["error.sonner.500"]
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      _fnGetUpdateProduct(id, payload)
        .then((response) => {
          if (response?.error?.code !== 200) {
            throw new Error(response?.error?.message || "Không thể cập nhật sản phẩm");
          }
          onSuccess();
          fnClear();
          setOpen(false);
          sonner({
            type: "success",
            message: "Cập nhật sản phẩm thành công"
          });
        })
        .catch((error) => {
          sonner({
            type: "error",
            message: error?.message || common["error.sonner.500"]
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const fnVal = () => {
    let hasError = false;
    if (isNullOrEmpty(name) || isNullOrEmpty((name || "").trim())) {
      hasError = true;
      setNameError("Vui lòng nhập sản phẩm");
    }
    if (!price) {
      hasError = true;
      setPriceError("Vui lòng nhập giá sản phẩm");
    }
    if (isNullOrEmpty(categoryID) || isNullOrEmpty((categoryID || "").trim())) {
      hasError = true;
      setCategoryError("Vui lòng chọn danh mục");
    }
    if (!productionBatchID) {
      hasError = true;
      setProductionBatchError("Vui lòng chọn lô sản xuất");
    }
    if (isNullOrEmpty(description) || isNullOrEmpty((description || "").trim())) {
      hasError = true;
      setDescriptionError("Vui lòng nhập mô tả");
      sonner({
        type: "error",
        message: "Vui lòng nhập mô tả"
      });
    }
    if (isNullOrEmpty(content) || isNullOrEmpty((content || "").trim())) {
      hasError = true;
      setContentError("Vui lòng nhập nội dung chi tiết");
    }
    const imageUrls = image.map((url) => url.trim()).filter(Boolean);
    if (imageUrls.length === 0) {
      hasError = true;
      setImageError("Vui lòng tải hình ảnh");
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
    setStatus("1");
    setCategoryID("");
    setProductionBatchID("");
    setProperty([]);
    setImage([]);
    setPrice(0);
    setCurrentPrice(0);
    setIsHot("0");
    setUnit("");
    setMetaName("");
    setDescription("");
    setContent("");
    setMetaDescription("");

    setNameError(null);
    setStatusError(null);
    setPriceError(null);
    setCategoryError(null);
    setProductionBatchError(null);
    setImageError(null);
    setDescriptionError(null);
    setContentError(null);
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
      className="w-[1200px] max-w-full max-h-[90vh] overflow-y-auto"
      title={type === "create" ? "Tạo mới sản phẩm" : "Cập nhật sản phẩm"}
      textAction={type === "create" ? "Tạo mới" : "Cập nhật"}
      loadingAction={loading}
      onToggle={(val) => {
        setOpen(val);
        fnClear();
      }}
      onAction={handleAction}
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <InputField
            name="name"
            label="Tên sản phẩm"
            value={name}
            error={nameError}
            placeholder="Nhập tên sản phẩm ..."
            onChange={(evt) => {
              setName(evt.target.value);
              setNameError(null);
            }}
          />
        </div>
        <div className="col-span-3">
          <InputField
            name="price"
            label="Giá gốc"
            value={price}
            error={priceError}
            placeholder="Nhập giá gốc ..."
            onChange={(evt) => {
              const value = evt.target.value;
              if (/^\d*$/.test(value)) {
                setPrice(Number(value));
                setPriceError(null);
              }
            }}
          />
        </div>
        <div className="col-span-3">
          <InputField
            name="current_price"
            label="Giá hiện tại"
            value={currentPrice}
            placeholder="Nhập giá hiện tại ..."
            onChange={(evt) => {
              const value = evt.target.value;
              if (/^\d*$/.test(value)) {
                setCurrentPrice(Number(value));
              }
            }}
          />
        </div>
        <div className="col-span-12">
          <DropzoneImageUpload
            maxFiles={10}
            label="Hình ảnh"
            listPreview={image}
            error={imageError}
            onChange={(urls) => {
              setImage(urls);
              setImageError(null);
            }}
          />
        </div>

        <div className="col-span-12">
          <FeatureForm label="Thuộc tính" items={property} onChange={setProperty} />
        </div>

        <div className="col-span-12 md:col-span-6">
          <SearchableSelectField
            name="category_id"
            label="Danh mục"
            value={categoryID}
            error={categoryError}
            options={lstCategory}
            placeholder="-- Chọn danh mục --"
            searchPlaceholder="Tìm danh mục..."
            onValueChange={(val) => {
              setCategoryID(val);
              setCategoryError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <SearchableSelectField
            name="production_batch_id"
            label="Lô sản xuất"
            value={productionBatchID}
            error={productionBatchError}
            options={productionBatchOptions}
            placeholder="-- Chọn lô sản xuất --"
            searchPlaceholder="Tìm lô sản xuất..."
            emptyText="Không có lô sản xuất đang hoạt động"
            onValueChange={(value) => {
              setProductionBatchID(value);
              setProductionBatchError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <SelectField
            name="is_hot"
            label="Sản phẩm nổi bật"
            value={isHot}
            options={[
              {
                label: "Không nổi bật",
                value: "0"
              },
              {
                label: "Nổi bật",
                value: "1"
              }
            ]}
            onValueChange={setIsHot}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            name="unit"
            label="Đơn vị sản phẩm"
            value={unit}
            placeholder="Nhập đơn vị (Hộp, Vỉ,...)"
            onChange={(evt) => {
              setUnit(evt.target.value);
            }}
          />
        </div>
        <div className="col-span-12">
          <QuillEditor
            label="Mô tả"
            value={description}
            onChange={(value) => {
              setDescription(value);
              setDescriptionError(null);
            }}
          />
          {descriptionError && <p className="mt-1 text-[13px] text-red-400">{descriptionError}</p>}
        </div>
        <div className="col-span-12">
          <QuillEditor
            label="Nội dung chi tiết"
            value={content}
            onChange={(value) => {
              setContent(value);
              setContentError(null);
            }}
          />
          {contentError && <p className="mt-1 text-[13px] text-red-400">{contentError}</p>}
        </div>
        <div className="col-span-12">
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
        </div>
        <div className="col-span-12">
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
        <div className="col-span-12">
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
                value: "2"
              }
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

DialogProducts.displayName = "DialogProducts";
export type { IRef };
export default DialogProducts;
