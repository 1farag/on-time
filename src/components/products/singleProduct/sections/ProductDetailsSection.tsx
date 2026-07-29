// components/products/singleProduct/sections/ProductDetailsSection.tsx
import { Tabs, TabsProps } from "antd";
import { ReviewList } from "../reviews/ReviewList";
import { AddReviewForm } from "../reviews/AddReviewForm";

interface ProductDetailsProps {
  product: {
    description: string;
    reviewCount: number;
    color?: string;
    availableSizes?: string[];
    currency?: string;
  };
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "وصف المنتج",
      children: (
        <div>
          <h4 className="my-8 font-bold text-xl">وصف المنتج</h4>
          <p className="text-[#9D9DA1] whitespace-pre-wrap">
            {product.description || "لا يوجد وصف متاح"}
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: `التقييمات (${product.reviewCount || 0})`,
      children: (
        <div className="max-w-4xl mx-auto py-8">
          <h4 className="mb-8 font-bold text-3xl text-titlesColor">التقييمات</h4>
          <ReviewList productId={(product as any)._id || (product as any).id} />
          <AddReviewForm productId={(product as any)._id || (product as any).id} />
        </div>
      ),
    },
    {
      key: "3",
      label: "المواصفات",
      children: (
        <div>
          <h4 className="my-8 font-bold text-xl">المواصفات</h4>
          <ul className="space-y-2 text-[#9D9DA1]">
            {product.color && (
              <li>
                <strong>اللون:</strong> {product.color}
              </li>
            )}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <li>
                <strong>المقاسات المتوفرة:</strong>{" "}
                {product.availableSizes.join(", ")}
              </li>
            )}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section className="product-details-tabs my-20">
      <Tabs defaultActiveKey="1" items={items} className="tabsS1" />
    </section>
  );
};
