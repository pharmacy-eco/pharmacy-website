"use client";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";
import FileService from "@/services/cms/file";
import { DynamicIcon } from "../dynamic-lucidev";
import sonner from "../sonner-atom";
import common from "@/enums/common-text";

interface UploadImage {
  id: string;
  file: File | any;
  preview: string;
  status: "loading" | "uploaded" | "error";
}

interface ICloudinary {
  api_key: string;
  asset_folder: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  display_name: string;
  etag: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: any;
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}

interface Props {
  maxFiles?: number;
  maxFileSizeMb?: number;
  listPreview?: string[];
  onUploaded?: (files: ICloudinary[]) => void;
}

const DropzoneImageUpload: React.FC<Props> = ({ maxFiles = 5, maxFileSizeMb = 5, listPreview = [], onUploaded }) => {
  const [images, setImages] = useState<UploadImage[]>([]);

  useEffect(() => {
    if (listPreview.length > 0) {
      const mapped = listPreview.map((img) => ({
        id: uuid(),
        file: null as any,
        preview: img,
        status: "uploaded"
      }));
      setImages(mapped as any);
    }
  }, [listPreview]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const validFiles: UploadImage[] = [];
      for (const file of acceptedFiles) {
        if (!file.type.startsWith("image/")) continue;
        if (file.size > maxFileSizeMb * 1024 * 1024) continue;

        validFiles.push({
          id: uuid(),
          file,
          preview: URL.createObjectURL(file),
          status: "loading"
        });
      }

      const updated = [...images, ...validFiles].slice(0, maxFiles);
      setImages(updated);
      await uploadImages(validFiles);
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".heic"]
    },
    onDrop,
    multiple: maxFiles !== 1,
    maxFiles
  });

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const uploadImages = async (files: UploadImage[]) => {
    const payload = new FormData();
    files.forEach((f) => payload.append("files", f.file));
    try {
      const res = await FileService.fnUploadFileImage(payload);
      setImages((prev) =>
        prev.map((img) => (files.find((f) => f.id === img.id) ? { ...img, status: "uploaded" } : img))
      );
      onUploaded?.(res?.data?.url || []);
    } catch (error) {
      onUploaded?.([]);
      setImages((prev) => prev.map((img) => (files.find((f) => f.id === img.id) ? { ...img, status: "error" } : img)));
      sonner({
        type: "error",
        title: "Tải ảnh",
        message: common["error.sonner.500"]
      });
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm text-black-02 pb-1">Tải ảnh</label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer ${
          isDragActive ? "border-blue-400" : "border-[#eaf0f6]"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-600">Kéo và thả ảnh vào đây hoặc nhấn để chọn ảnh</p>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {images.length > 0 &&
          images.map((img) => (
            <div key={img.id} className="relative w-32 h-32 group rounded-lg border overflow-hidden">
              {!!img.preview && <img src={img.preview} alt="preview" className="object-contain w-full h-full" />}
              <button
                onClick={() => removeImage(img.id)}
                className=" absolute z-10 w-5 h-5 top-1 right-1 bg-white text-red-500 font-bold text-xs rounded-full flex items-center justify-center hover:bg-red-100"
              >
                <DynamicIcon name="X" className="w-3 h-3" />
              </button>
              {img.status === "loading" && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center text-xs font-medium text-gray-700">
                  Đang tải lên...
                </div>
              )}
              {img.status === "error" && (
                <div className="absolute inset-0 bg-red-100/80 flex items-center justify-center text-xs font-medium text-red-600">
                  Lỗi
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

DropzoneImageUpload.displayName = "DropzoneImageUpload";
export default DropzoneImageUpload;
