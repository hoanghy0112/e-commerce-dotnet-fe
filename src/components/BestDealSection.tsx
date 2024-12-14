import { getBestDealsAPI } from "@/services/api/product/product-list";
import Section from "./Section";
import ProductItem from "./ProductItem";

export default async function BestDealSection() {
  const { products } = await getBestDealsAPI();

  return (
    <Section title="Today’s Best Deal" url="/phones?altReq=best_deals">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
        {/* Limit to 6 */}
        {products.slice(0, 6).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
}
