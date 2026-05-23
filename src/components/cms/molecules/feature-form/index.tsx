import React, { useState } from "react";
import { DynamicIcon } from "../../atoms/dynamic-lucidev";
import InputField from "../../atoms/next-input/input-field";
import { IProperty } from "@/types/cms/product";
import { NextTextarea } from "../../atoms/next-textarea";

interface IProps {
  items: IProperty[];
  onChange: (items: IProperty[]) => void;
  label?: string;
  className?: string;
}

const FeatureForm: React.FC<IProps> = ({ className = "", items, label = "", onChange, ...props }) => {

  const handleAdd = () => {
    onChange([...items, { name: "", value: "" }]);
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: "name" | "value",
    value: string
  ) => {
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
            <div className="flex flex gap-4 items-center my-2" key={index}>
              <InputField
                name="name"
                value={item.name}
                placeholder={`Nhập tên ${label} ...`}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
              <div className="w-full">
                <NextTextarea
                  name="value-feature"
                  rows={1}
                  value={item.value}
                  placeholder="Nhập mô tả ..."
                  onChange={(e) => handleChange(index, "value", e.target.value)}
                />
              </div>
              <div className="flex items-end h-full">
                <button
                  onClick={() => handleRemove(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  <DynamicIcon name="trash" size={14} color="#fff" />
                </button>
              </div>
            </div>
          )
        }
        )}
      </div>
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        <DynamicIcon name="plus" size={16} color="#fff" />
      </button>

    </div>
  );
}


FeatureForm.displayName = "FeatureForm";
export default FeatureForm;
