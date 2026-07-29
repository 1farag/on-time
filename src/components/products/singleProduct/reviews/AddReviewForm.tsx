import { Rate, Input, Button } from "antd";
import { useState } from "react";
import { useAddProductReview } from "@/hooks/products/useProductReviews";

const { TextArea } = Input;

interface AddReviewFormProps {
  productId: string;
}

export const AddReviewForm = ({ productId }: AddReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addReviewMutation = useAddProductReview();

  const handleSubmit = async () => {
    if (rating === 0) {
      return; // Should probably show a toast, but keeping it simple for now
    }

    addReviewMutation.mutate(
      {
        productId,
        rating,
        comment,
      },
      {
        onSuccess: () => {
          setRating(0);
          setComment("");
        },
      }
    );
  };

  return (
    <div className="mt-12 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-2xl font-bold text-titlesColor mb-6">تقييم المنتج</h3>

      <div className="mb-6 flex items-center gap-4">
        <span className="text-lg font-medium text-titlesColor">
          تقييمك للمنتج:
        </span>
        <Rate
          value={rating}
          onChange={setRating}
          className="!text-primary text-2xl"
        />
      </div>

      <div className="mb-6">
        <TextArea
          rows={4}
          placeholder="اترك المراجعة الخاصة بك"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="rounded-lg p-4 text-titlesColor placeholder:text-primary focus:border-main hover:border-main"
        />
      </div>

      <Button
        type="primary"
        onClick={handleSubmit}
        loading={addReviewMutation.isPending}
        className="h-12 px-12 bg-titlesColor hover:bg-black border-none rounded-full text-lg font-bold"
      >
        إرسال التقييم
      </Button>
    </div>
  );
};
