"use client";
import { useRouter } from 'next/router';
import ProductDetail from '@/components/ProductDetail';

export default function ProductDetailPage() {
  const router = useRouter();

  if (typeof window === 'undefined' || !router.isReady) {
    return <div>Loading...</div>;
  }

  const { productId } = router.query;

  if (!productId) return <div>Loading...</div>;

  return <ProductDetail productId={productId as string} />;
}

