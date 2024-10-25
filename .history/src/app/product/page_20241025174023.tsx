import ProductDetail from '../../components/ProductDetail';

export default function Page() {
  const productId = '1'; // Gán productId tĩnh hoặc lấy từ URL
  return <ProductDetail productId={productId} />;
}
