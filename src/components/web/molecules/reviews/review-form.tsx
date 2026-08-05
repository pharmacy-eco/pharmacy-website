"use client";
import DialogForm from "@/components/cms/atoms/next-dialog/dialog-form";
import { NextInput } from "@/components/cms/atoms/next-input";
import React, { useState } from "react";
import NextImage from "next/image";
import { Label } from "@/components/ui/label";
import { useReviewStore } from "@/stores/review";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import sonner from "@/components/cms/atoms/sonner-atom";
import common from "@/enums/common-text";
import { NextTextarea } from "../../atoms/next-textarea";

interface IProps {
  product: {
    id: number;
    name: string;
    img: string;
  };
}

const ReviewForm: React.FC<IProps> = ({ product }: IProps) => {
  const { isOpen, closeReview, _sendFormReview } = useReviewStore();
  const [loading, setLoading] = useState<boolean>(false);
  if (!product) return null;
  const [formData, setFormData] = useState({
    product_id: product.id,
    name: "",
    star: 0,
    content: ""
  });
  const [rating, setRating] = useState(1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setFormData({
      product_id: product.id,
      name: "",
      star: 1,
      content: ""
    });
    setRating(1);
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      sonner({
        type: "error",
        message: "Vui lòng điền tên của bạn"
      });
      return;
    }
    formData.star = rating;
    setLoading(true);
    _sendFormReview(formData)
      .then((res) => {
        if (res.error.code >= 200 && res.error.code < 300) {
          sonner({
            type: "success",
            message: "Đánh giá sản phẩm thành công!"
          });
          clearForm();
          closeReview();
          return;
        } else {
          sonner({
            type: "error",
            message: common["error.sonner.500"]
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DialogForm
      title="Đánh giá sản phẩm"
      textAction="Gửi đánh giá"
      loadingAction={loading}
      open={isOpen}
      onToggle={() => closeReview()}
      onCancel={() => closeReview()}
      onAction={handleSubmit}
    >
      <div className="">
        <div className="flex items-center gap-2">
          <NextImage
            src={product.img}
            width={200}
            height={200}
            alt="Product Image"
            className="max-w-[80px] max-h-[80px] border rounded-lg object-cover p-2"
          />
          <Label className="text-sm font-medium">{product.name}</Label>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 my-3">
        <Rating style={{ maxWidth: 180 }} value={rating} onChange={setRating} />
      </div>
      <div className="mt-3">
        <NextInput
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          className=""
        />
      </div>
      <NextTextarea
        name="content"
        placeholder="Nhập nội dung đánh giá"
        value={formData.content}
        onChange={handleChange}
        className="mt-2"
      />
    </DialogForm>
  );
};

ReviewForm.displayName = "ReviewForm";
export default ReviewForm;
