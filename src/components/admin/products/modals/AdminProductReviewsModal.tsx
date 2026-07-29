"use client";

import { Modal, Rate, Empty, Skeleton } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import DeleteModal from "@/components/tools/modal/DeleteModal";
import {
  useGetProductReviews,
  useDeleteProductReview,
} from "@/hooks/products/useProductReviews";
import dayjs from "dayjs";

interface AdminProductReviewsModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const AdminProductReviewsModal = ({
  productId,
  isOpen,
  onClose,
  productName,
}: AdminProductReviewsModalProps) => {
  const { reviews, isLoading } = useGetProductReviews(productId);
  const { mutate: deleteReview, isPending: isDeleting } =
    useDeleteProductReview(productId);

  return (
    <Modal
      title={`تقييمات المنتج: ${productName}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
    >
      <div className="max-h-[60vh] overflow-y-auto px-2">
        {isLoading ? (
          <div className="space-y-4 py-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} active avatar paragraph={{ rows: 2 }} />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-12">
            <Empty description="لا توجد تقييمات لهذا المنتج" />
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {reviews.map((review: any) => (
              <div
                key={review._id}
                className="py-4 flex justify-between items-start"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-titlesColor">
                      {review.userId?.firstName} {review.userId?.lastName}
                    </span>
                    <Rate
                      disabled
                      defaultValue={review.rating}
                      className="text-xs !text-primary"
                    />
                    <span className="text-xs text-primary">
                      {dayjs(review.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                  <p className="text-primary text-sm leading-relaxed">
                    {review.comment || (
                      <span className="italic opacity-50">بدون تعليق</span>
                    )}
                  </p>
                </div>

                <DeleteModal
                  heading="حذف التقييم"
                  description="هل أنت متأكد من حذف هذا التقييم؟ لا يمكن التراجع عن هذا الإجراء."
                  handleDelete={async () => deleteReview(review._id)}
                  deleteLoading={isDeleting}
                >
                  <button className="text-primary hover:text-red-700 p-2 transition-colors">
                    <FaTrashAlt size={16} />
                  </button>
                </DeleteModal>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
