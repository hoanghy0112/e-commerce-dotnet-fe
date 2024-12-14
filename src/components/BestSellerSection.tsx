import { getBestSellerAPI } from "@/services/api/product/product-list";
import Section from "./Section";
import ProductItem from "./ProductItem";

export default async function BestSellerSection() {
  const { products } = await getBestSellerAPI();

  return (
    <Section title="Best Sellers" url="/phones?altReq=best_sellers">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
        {/* Maximum 12 products */}
        {products.slice(0, 12).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
}
