import React from "react";
import { DynamicIcon } from "../../atoms/dynamic-lucidev";
import InputField from "../../atoms/next-input/input-field";
import { NextTextarea } from "../../atoms/next-textarea";
import { ISocial } from "@/types/cms/general";
import DropzoneImageUpload from "../../atoms/upload/dropzone-image-upload";

interface IProps {
  items: ISocial[] | [];
  onChange: (items: ISocial[]) => void;
  label?: string;
  className?: string;
}

const SocialForm: React.FC<IProps> = ({ className = "", items, label = "", onChange, ...props }) => {
  const handleAdd = () => {
    onChange([...items, { image: "", name: "", link: "" }]);
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: "image" | "name" | "link", value: string) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    onChange(updatedItems);
  };

  return (
    <div className="space-y-4">
      <span>{label}</span>
      <div className="">
        {items.map((item, index) => {
          return (
            <div className="my-2 grid grid-cols-12 gap-4 rounded-lg border border-gray-100 p-3" key={index}>
              <div className="col-span-12 md:col-span-4">
                <DropzoneImageUpload
                  maxFiles={1}
                  label="Ảnh"
                  listPreview={item.image ? [item.image] : []}
                  onChange={(urls) => handleChange(index, "image", urls[0] || "")}
                />
              </div>
              <div className="col-span-12 flex flex-col gap-3 md:col-span-7">
                <InputField
                  name="name"
                  value={item.name}
                  placeholder={`Nhập tên ${label} ...`}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
                <NextTextarea
                  name="value-feature"
                  rows={1}
                  value={item.link}
                  placeholder="Nhập đường dẫn ..."
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                />
              </div>
              <div className="col-span-12 flex items-start md:col-span-1">
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  <DynamicIcon name="trash" size={14} color="#fff" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button type="button" onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        <DynamicIcon name="plus" size={16} color="#fff" />
      </button>
    </div>
  );
};

SocialForm.displayName = "SocialForm";
export default SocialForm;
