"use client";

import React, { useState, useImperativeHandle, useEffect } from "react";
import DialogForm from "../../atoms/next-dialog/dialog-form";
import InputField from "../../atoms/next-input/input-field";
import { isNullOrEmpty } from "@/utils/validate";
import SelectField from "../../atoms/select-atom/select-field";
import { useInfoStore } from "@/stores/info";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";
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

const DialogInfos = React.forwardRef<IRef, IProps>(({ onSuccess }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<"create" | "update">("create");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  const [id, setID] = useState<number>();
  const [name, setName] = useState<string>("");

  const [status, setStatus] = useState<string>("1");
  const [description, setDescription] = useState<string>("");
  const [metaName, setMetaName] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [metaNameError, setMetaNameError] = useState<string | null>(null);
  const [metaDescriptionError, setMetaDescriptionError] = useState<string | null>(null);

  const { _fnGetCreateInfo, _fnGetUpdateInfo, _fnGetDetailInfo } = useInfoStore();

  useEffect(() => {
    let isMounted = true;

    if (!!id && open && type === "update") {
      setLoadingDetail(true);
      _fnGetDetailInfo(id)
        .then((res) => {
          if (!isMounted) return;
          const data = res?.data;
          setName(data?.name || "");
          setStatus(String(data?.status ?? "1"));
          setDescription(data?.description || "");
          setMetaName(data?.meta_name || "");
          setMetaDescription(data?.meta_description || "");
        })
        .catch((error) => {
          if (!isMounted) return;
          console.log(error);
          sonner({
            type: "error",
            message: "Không thể lấy dữ liệu thông tin"
          });
        })
        .finally(() => {
          if (!isMounted) return;
          setLoadingDetail(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [id, open, type]);

  const handleAction = () => {
    if (loadingDetail) return;
    if (fnVal()) return;
    if (type === "update" && !id) {
      sonner({
        type: "error",
        message: "Không tìm thấy dữ liệu cần cập nhật"
      });
      return;
    }
    const payload = {
      name: name,
      description: description,
      meta_name: metaName,
      meta_description: metaDescription,
      status: Number(status)
    };
    setLoading(true);
    if (type === "create") {
      _fnGetCreateInfo(payload)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Tạo thông tin thành công"
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
      _fnGetUpdateInfo(id, payload)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Cập nhật thông tin thành công"
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
      setNameError("Vui lòng nhập thông tin");
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
    setMetaName("");
    setDescription("");
    setMetaDescription("");
    setLoadingDetail(false);

    setNameError(null);
    setStatusError(null);
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
      className="w-[800px] max-w-full max-h-[90vh] overflow-y-auto"
      title={type === "create" ? "Tạo mới thông tin" : "Cập nhật thông tin"}
      textAction={type === "create" ? "Lưu" : "Lưu thay đổi"}
      loadingAction={loading || loadingDetail}
      disabledAction={loadingDetail}
      onToggle={(val) => {
        setOpen(val);
        if (!val) {
          fnClear();
          setID(undefined);
        }
      }}
      onAction={handleAction}
    >
      <div className="grid grid-cols-12 gap-4">
        {type === "update" && (
          <div className="col-span-12 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm text-blue-700">
            {loadingDetail ? "Đang tải dữ liệu..." : "Dữ liệu đã sẵn sàng để cập nhật"}
          </div>
        )}
        <div className="col-span-12">
          <InputField
            name="name"
            label="Tiêu đề"
            value={name}
            error={nameError}
            placeholder="Nhập tiêu đề ..."
            onChange={(evt) => {
              setName(evt.target.value);
              setNameError(null);
            }}
          />
        </div>
        <div className="col-span-12">
          <QuillEditor label="Mô tả" value={description} onChange={setDescription} />
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
    </DialogForm>
  );
});

DialogInfos.displayName = "DialogInfos";
export type { IRef };
export default DialogInfos;
