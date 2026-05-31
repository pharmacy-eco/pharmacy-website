"use client";

import React, { useState, useImperativeHandle, useEffect } from "react";
import DialogForm from "../../atoms/next-dialog/dialog-form";
import InputField from "../../atoms/next-input/input-field";
import { isNullOrEmpty } from "@/utils/validate";
import SelectField from "../../atoms/select-atom/select-field";
import { useUserStore } from "@/stores/user";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";
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

const DialogUsers = React.forwardRef<IRef, IProps>(({ onSuccess }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<"create" | "update">("create");
  const [loading, setLoading] = useState<boolean>(false);

  const [id, setID] = useState<number>();
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [gender, setGender] = useState<string>("1");
  const [roleID, setRoleID] = useState<string>("2");
  const [status, setStatus] = useState<string>("1");

  const [fullnameError, setFullnameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  const { _fnGetCreateUser, _fnGetUpdateUser, _fnGetDetailUser } = useUserStore();

  useEffect(() => {
    if (!!id && open && type === "update") {
      _fnGetDetailUser(id)
        .then((res) => {
          const data = res?.data;
          setFullname(data?.fullname || "");
          setUsername(data?.username || "");
          setEmail(data?.email || "");
          setPhone(data?.phone || "");
          setAddress(data?.address || "");
          setStatus(String(data?.status ?? "1"));
          setGender(String(data?.gender ?? "1"));
          setRoleID(String(data?.role_id ?? "2"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);

  const handleAction = () => {
    if (fnVal()) return;

    const payload: any = {
      fullname: fullname,
      username: username,
      email: email,
      phone: phone,
      address: address,
      gender: Number(gender),
      role_id: Number(roleID),
      status: Number(status)
    };

    if (type === "create") payload.password = password;
    if (type === "update" && !isNullOrEmpty(password)) payload.password = password;

    setLoading(true);
    if (type === "create") {
      _fnGetCreateUser(payload)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Tạo người dùng thành công"
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
      _fnGetUpdateUser(id, payload)
        .then(() => {
          onSuccess();
          fnClear();
          sonner({
            type: "success",
            message: "Cập nhật người dùng thành công"
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
    if (isNullOrEmpty(fullname) || isNullOrEmpty((fullname || "").trim())) {
      hasError = true;
      setFullnameError("Vui lòng nhập họ tên");
    }
    if (isNullOrEmpty(username) || isNullOrEmpty((username || "").trim())) {
      hasError = true;
      setUsernameError("Vui lòng nhập username");
    }
    if (isNullOrEmpty(email) || isNullOrEmpty((email || "").trim())) {
      hasError = true;
      setEmailError("Vui lòng nhập email");
    }
    if (isNullOrEmpty(phone) || isNullOrEmpty((phone || "").trim())) {
      hasError = true;
      setPhoneError("Vui lòng nhập số điện thoại");
    }
    if (type === "create" && (isNullOrEmpty(password) || isNullOrEmpty((password || "").trim()))) {
      hasError = true;
      setPasswordError("Vui lòng nhập mật khẩu");
    }
    if (isNullOrEmpty(status) || isNullOrEmpty((status || "").trim())) {
      hasError = true;
      setStatusError("Vui lòng chọn trạng thái");
    }
    return hasError;
  };

  const fnClear = () => {
    setFullname("");
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
    setAddress("");
    setGender("1");
    setRoleID("2");
    setStatus("1");

    setFullnameError(null);
    setUsernameError(null);
    setEmailError(null);
    setPhoneError(null);
    setPasswordError(null);
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
      className="w-[800px] max-w-full max-h-[90vh] overflow-y-auto"
      title={type === "create" ? "Tạo mới người dùng" : "Cập nhật người dùng"}
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
            name="fullname"
            label="Họ tên"
            value={fullname}
            error={fullnameError}
            placeholder="Nhập họ tên ..."
            onChange={(evt) => {
              setFullname(evt.target.value);
              setFullnameError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            name="username"
            label="Username"
            value={username}
            error={usernameError}
            placeholder="Nhập username ..."
            onChange={(evt) => {
              setUsername(evt.target.value);
              setUsernameError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            name="email"
            label="Email"
            value={email}
            error={emailError}
            placeholder="Nhập email ..."
            onChange={(evt) => {
              setEmail(evt.target.value);
              setEmailError(null);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputField
            name="phone"
            label="Số điện thoại"
            value={phone}
            error={phoneError}
            placeholder="Nhập số điện thoại ..."
            onChange={(evt) => {
              setPhone(evt.target.value);
              setPhoneError(null);
            }}
          />
        </div>
        <div className="col-span-12">
          <InputField
            name="password"
            label={type === "create" ? "Mật khẩu" : "Mật khẩu mới (không bắt buộc)"}
            value={password}
            error={passwordError}
            type="password"
            placeholder="Nhập mật khẩu ..."
            onChange={(evt) => {
              setPassword(evt.target.value);
              setPasswordError(null);
            }}
          />
        </div>
        <div className="col-span-12">
          <TextareaRoot
            name="address"
            label="Địa chỉ"
            value={address}
            placeholder="Nhập địa chỉ ..."
            onChange={(evt) => {
              setAddress(evt.target.value);
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <SelectField
            name="gender"
            label="Giới tính"
            value={gender}
            options={[
              { label: "Nam", value: "1" },
              { label: "Nữ", value: "0" }
            ]}
            onValueChange={setGender}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <SelectField
            name="role_id"
            label="Vai trò"
            value={roleID}
            options={[
              { label: "Admin", value: "1" },
              { label: "Nhân viên", value: "2" }
            ]}
            onValueChange={setRoleID}
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
              { label: "Khóa", value: "0" }
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

DialogUsers.displayName = "DialogUsers";
export type { IRef };
export default DialogUsers;
