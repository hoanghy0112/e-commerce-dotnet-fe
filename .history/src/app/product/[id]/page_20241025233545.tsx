import ProductDetail from "@/components/ProductDetail";
import { useRouter } from "next/router";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // Kiểm tra nếu id chưa có
  if (!id) return <p>Loading...</p>;

  return <ProductDetail productId={id as string} />;
}
