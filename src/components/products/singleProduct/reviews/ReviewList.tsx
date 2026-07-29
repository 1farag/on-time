import { useGetProductReviews } from "@/hooks/products/useProductReviews";
import { ReviewItem } from "./ReviewItem";
import { Skeleton, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

interface ReviewListProps {
    productId: string;
}

export const ReviewList = ({ productId }: ReviewListProps) => {
    const { reviews, isLoading, pagination, refetch } = useGetProductReviews(productId);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} avatar active paragraph={{ rows: 2 }} />
                ))}
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-primary text-lg">لا توجد تقييمات بعد لهذا المنتج</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="divide-y divide-gray-100">
                {reviews.map((review) => (
                    <ReviewItem key={review._id} review={review} />
                ))}
            </div>

            {pagination.total > reviews.length && (
                <div className="flex justify-center mt-8">
                    <Button
                        icon={<ReloadOutlined />}
                        className="h-10 px-8 rounded-full border-gray-200 text-primary hover:text-main hover:border-main transition-colors"
                    >
                        عرض المزيد من التقييمات
                    </Button>
                </div>
            )}
        </div>
    );
};
