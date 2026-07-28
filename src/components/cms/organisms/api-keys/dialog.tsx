"use client";

import React, { useEffect, useImperativeHandle, useState } from "react";
import DialogForm from "../../atoms/next-dialog/dialog-form";
import InputField from "../../atoms/next-input/input-field";
import SelectField from "../../atoms/select-atom/select-field";
import { isNullOrEmpty } from "@/utils/validate";
import { useApiKeyStore } from "@/stores/api-key";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";
import { CreateApiKeyDto, UpdateApiKeyDto } from "@/types/cms/api-key";

interface IProps {
  onSuccess: () => void;
}

interface IRef {
  _onType: (_: "create" | "update") => void;
  _setID: (_: number | undefined) => void;
  onOpen: () => void;
  onClose: () => void;
}

const DEFAULT_MODEL = "gemini-3.6-flash";

const DialogApiKey = React.forwardRef<IRef, IProps>(({ onSuccess }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<"create" | "update">("create");
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setID] = useState<number>();

  const [name, setName] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [model, setModel] = useState<string>(DEFAULT_MODEL);
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [tokenQuota, setTokenQuota] = useState<string>("0");
  const [status, setStatus] = useState<string>("1");

  const [nameError, setNameError] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const [expiresAtError, setExpiresAtError] = useState<string | null>(null);
  const [tokenQuotaError, setTokenQuotaError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  const { _fnGetCreateApiKey, _fnGetUpdateApiKey, _fnGetDetailApiKey } = useApiKeyStore();

  useEffect(() => {
    if (!!id && open && type === "update") {
      _fnGetDetailApiKey(id)
        .then((res) => {
          const data = res?.data;
          setName(data?.name || "");
          setApiKey("");
          setModel(data?.model || DEFAULT_MODEL);
          setExpiresAt(data?.expires_at?.slice(0, 10) || "");
          setTokenQuota(String(data?.token_quota ?? 0));
          setStatus(String(data?.status || 1));
        })
        .catch(() => {
          sonner({
            type: "error",
            message: common["error.sonner.500"]
          });
        });
    }
  }, [id, open, type]);

  const fnVal = () => {
    let hasError = false;
    const quota = Number(tokenQuota);

    if (isNullOrEmpty(name) || isNullOrEmpty(name.trim())) {
      hasError = true;
      setNameError("Vui lòng nhập tên API key");
    }

    if (type === "create" && (isNullOrEmpty(apiKey) || isNullOrEmpty(apiKey.trim()))) {
      hasError = true;
      setApiKeyError("Vui lòng nhập API key");
    }

    if (isNullOrEmpty(expiresAt) || isNullOrEmpty(expiresAt.trim())) {
      hasError = true;
      setExpiresAtError("Vui lòng chọn hạn dùng");
    }

    if (!Number.isFinite(quota) || quota < 0) {
      hasError = true;
      setTokenQuotaError("Token quota phải lớn hơn hoặc bằng 0");
    }

    if (status !== "1" && status !== "2") {
      hasError = true;
      setStatusError("Vui lòng chọn trạng thái");
    }

    return hasError;
  };

  const fnClear = () => {
    setID(undefined);
    setName("");
    setApiKey("");
    setModel(DEFAULT_MODEL);
    setExpiresAt("");
    setTokenQuota("0");
    setStatus("1");

    setNameError(null);
    setApiKeyError(null);
    setExpiresAtError(null);
    setTokenQuotaError(null);
    setStatusError(null);
  };

  const handleAction = () => {
    if (fnVal()) return;

    const normalizedModel = model.trim() || DEFAULT_MODEL;
    const payload: CreateApiKeyDto | UpdateApiKeyDto = {
      name: name.trim(),
      model: normalizedModel,
      expires_at: expiresAt,
      token_quota: Number(tokenQuota),
      status: Number(status) as 1 | 2
    };

    if (type === "create" || apiKey.trim()) {
      payload.api_key = apiKey.trim();
    }

    setLoading(true);
    if (type === "create") {
      _fnGetCreateApiKey(payload as CreateApiKeyDto)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Tạo API key thành công"
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
      _fnGetUpdateApiKey(id, payload as UpdateApiKeyDto)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Cập nhật API key thành công"
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

  useImperativeHandle(ref, () => ({
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    _onType: (val) => setType(val),
    _setID: (id) => setID(id)
  }));

  return (
    <DialogForm
      open={open}
      className="w-[680px] max-w-full"
      title={type === "create" ? "Tạo mới API key" : "Cập nhật API key"}
      textAction={type === "create" ? "Tạo mới" : "Cập nhật"}
      loadingAction={loading}
      onToggle={(val) => {
        setOpen(val);
        if (!val) fnClear();
      }}
      onAction={handleAction}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          name="name"
          label="Tên"
          value={name}
          error={nameError}
          placeholder="Nhập tên API key ..."
          onChange={(evt) => {
            setName(evt.target.value);
            setNameError(null);
          }}
        />
        <InputField
          name="model"
          label="Model"
          value={model}
          placeholder={DEFAULT_MODEL}
          onChange={(evt) => {
            setModel(evt.target.value);
          }}
        />
        <div className="md:col-span-2">
          <InputField
            name="api_key"
            label="API key"
            value={apiKey}
            type="password"
            autoComplete="new-password"
            error={apiKeyError}
            placeholder={type === "create" ? "Nhập API key ..." : "Để trống nếu không đổi API key"}
            onChange={(evt) => {
              setApiKey(evt.target.value);
              setApiKeyError(null);
            }}
          />
        </div>
        <InputField
          name="expires_at"
          label="Hạn dùng"
          value={expiresAt}
          type="date"
          error={expiresAtError}
          onChange={(evt) => {
            setExpiresAt(evt.target.value);
            setExpiresAtError(null);
          }}
        />
        <InputField
          name="token_quota"
          label="Token quota"
          value={tokenQuota}
          type="number"
          min={0}
          note="Nhập 0 nếu không giới hạn"
          error={tokenQuotaError}
          onChange={(evt) => {
            setTokenQuota(evt.target.value);
            setTokenQuotaError(null);
          }}
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
              label: "Tạm khóa",
              value: "2"
            }
          ]}
          onValueChange={(val) => {
            setStatus(val);
            setStatusError(null);
          }}
        />
      </div>
    </DialogForm>
  );
});

DialogApiKey.displayName = "DialogApiKey";
export type { IRef };
export default DialogApiKey;
