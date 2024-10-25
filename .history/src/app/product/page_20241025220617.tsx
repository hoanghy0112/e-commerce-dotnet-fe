"use client"
import { useRouter } from 'next/router';

import ProductDetail from '@/components/ProductDetail';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const router = useRouter();
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const { productId } = router.query;
      if (productId) {
        setProductId(productId as string);
      }
    }
  }, [router.isReady, router.query]);

  if (!productId) return <div>Loading...</div>;

  return <ProductDetail productId={productId} />;
}
