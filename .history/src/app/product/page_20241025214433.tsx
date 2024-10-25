"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductDetail from '@/components/ProductDetail';

export default function ProductDetailPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !router.isReady) {
    return <div>Loading...</div>;
  }

  const { productId } = router.query;

  if (!productId) return <div>Loading...</div>;

  return <ProductDetail productId={productId as string} />;
}
