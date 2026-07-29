import { Rate } from "antd";
import { ReviewItem as ReviewType } from "@/hooks/products/useProductReviews";
import dayjs from "dayjs";
import Image from "next/image";

interface ReviewItemProps {
  review: ReviewType;
}

export const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <div className="flex gap-4 p-6 border-b border-[#F5F5F5] last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {/* Placeholder for user image if available, else initials */}
          <span className="text-lg font-bold text-gray-400">
            {review.userId?.firstName?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h5 className="font-bold text-titlesColor mb-1">
              {review.userId?.firstName} {review.userId?.lastName}
            </h5>
            <span className="text-sm text-primary">
              {dayjs(review.createdAt).format("DD MMMM - YYYY")}
            </span>
          </div>
          <Rate
            disabled
            defaultValue={review.rating}
            className="!text-primary text-sm"
          />
        </div>
        <p className="text-primary leading-relaxed">{review.comment}</p>
      </div>
    </div>
  );
};
