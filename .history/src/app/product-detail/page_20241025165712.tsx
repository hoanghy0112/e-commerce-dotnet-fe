import React, { useEffect, useState } from 'react';
import ProductDetail from '@/components/ProductDetail';
import { getProductDetailAPI } from '@/services/api/product/product-detail';
import { IProduct } from './';

const ProductDetailPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    // Giả lập lấy ID sản phẩm từ URL hoặc props (tạm thời dùng ID 1)
    const productId = 1;

    // Gọi API để lấy chi tiết sản phẩm
    const fetchProductDetail = async () => {
      const response = await getProductDetailAPI(productId);
      setProduct(response);
    };

    fetchProductDetail();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-24 pt-10">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
