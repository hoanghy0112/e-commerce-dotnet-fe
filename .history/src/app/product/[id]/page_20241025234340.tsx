import ProductDetail from "@/components/ProductDetail";
import { GetServerSideProps } from "next";

interface ProductDetailPageProps {
  productId: string;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  return <ProductDetail productId={productId} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!; // Lấy id từ URL

  return {
    props: {
      productId: id, // Truyền id vào props của component
    },
  };
};
