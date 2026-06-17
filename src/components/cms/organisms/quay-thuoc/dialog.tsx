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
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [categoryID, setCategoryID] = useState<string>("");
  const [property, setProperty] = useState<IProperty[]>([]);
  const [lstCategory, setListCategory] = useState<{ value: string; label: string }[] | []>([]);

  const [status, setStatus] = useState<string>("1");
  const [image, setImage] = useState<string[]>([]);
  const [unit, setUnit] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [metaName, setMetaName] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [metaNameError, setMetaNameError] = useState<string | null>(null);
  const [metaDescriptionError, setMetaDescriptionError] = useState<string | null>(null);

  const { _fnGetListCategory } = useCategoryStore();
  const { _fnGetCreateProduct, _fnGetUpdateProduct, _fnGetDetailProduct } = useProductStore();

  useEffect(() => {
    open && fnFetchListCategory();
    if (!!id && open && type === "update") {
      _fnGetDetailProduct(id)
        .then((res) => {
          const data = res?.data;
          setName(data?.name || "");
          setStatus(String(data?.status) || "");
          setCategoryID(String(data?.category_id));
          setProperty(data?.property || []);
          setDescription(data?.description || "");
          setImage(data?.image || []);
          setPrice(data?.price || 0);
          setBrand(data?.brand || "");
          setUnit(data?.unit || "");
          setMetaName(data?.meta_name || "");
          setMetaDescription(data?.meta_description || "");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);

  const fnFetchListCategory = () => {
    _fnGetListCategory('') //TODO: Update api category select
      .then((res) => {
        const items = res?.data.items.map((item: ICategory) => ({
          label: item.name,
          value: String(item.id)
        })) || [];
        setListCategory(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAction = () => {
    if (fnVal()) return;
    const payload = {
      name: name,
      price: price,
      brand: brand,
      image: ["/assets/image/medicine.jpg"], //TODO image
      category: [categoryID],
      property: property,
      description: description,
      unit: unit,
      meta_name: metaName,
      meta_description: metaDescription,
      status: Number(status),
    };
    setLoading(true);
    if (type === "create") {
      _fnGetCreateProduct(payload)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Tạo sản phẩm thành công"
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
      _fnGetUpdateProduct(id, payload)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Cập nhật sản phẩm thành công"
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
      setNameError("Vui lòng nhập sản phẩm");
    }
    if (isNullOrEmpty(description) || isNullOrEmpty((description || "").trim())) {
      hasError = true;
      setDescriptionError("Vui lòng nhập mô tả");
      sonner({
        type: "error",
        message: "Vui lòng nhập mô tả"
      });
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
    setStatus("");
    setCategoryID("");
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
        <div className="col-span-9">
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
            label="Giá sản phẩm"
            value={price}
            error={priceError}
            placeholder="Nhập giá sản phẩm ..."
            onChange={(evt) => {
              const value = evt.target.value;
              if (/^\d*$/.test(value)) {
                setPrice(Number(value));
                setPriceError(null);
              }
            }}
          />
        </div>
        <div className="col-span-12">
          {/* TODO: upload image */}

        </div>

        <div className="col-span-12">
          <FeatureForm label="Thuộc tính" items={property} onChange={setProperty} />
        </div>

        <div className="col-span-4">
          <SelectField
            name="category_id"
            label="Danh mục"
            className="w-full"
            value={categoryID}
            options={lstCategory}
            placeholder="-- Chọn danh mục --"
            onValueChange={(val) => setCategoryID(val)}  // TODO: select multiple
          />
        </div>
        <div className="col-span-4">
          <InputField
            name="brand"
            label="Thương hiệu"
            value={brand}
            placeholder="Nhập thương hiệu sản phẩm ..."
            onChange={(evt) => {
              setBrand(evt.target.value);
            }}
          />
        </div>
        <div className="col-span-4">
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
          <QuillEditor label='Mô tả' value={description} onChange={setDescription} />
          {/* <TextareaRoot
            name="description"
            label="Mô tả"
            value={description}
            error={descriptionError}
            placeholder="Nhập mô tả ..."
            onChange={(evt) => {
              setDescription(evt.target.value);
              setDescriptionError(null);
            }}
          /> */}
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
                value: "0"
              }
            ]}
            onValueChange={(val) => {
              setStatus(val);
              setStatusError(null);
            }}
          />
        </div>
      </div>
    </DialogForm >
  );
});

DialogProducts.displayName = "DialogProducts";
export type { IRef };
export default DialogProducts;
