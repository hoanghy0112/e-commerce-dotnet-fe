
import { useRouter } from 'next/router';
import ProductDetail from '@/components/ProductDetail';

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = router.query;

  if (!productId) return <div>Loading...</div>;

  return <ProductDetail productId={productId as string} />;
}
