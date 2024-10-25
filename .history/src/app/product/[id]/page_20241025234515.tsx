"use client"
import ProductDetail from "@/components/ProductDetail";
import { GetServerSideProps } from "next";

interface ProductDetailPageProps {
  productId: string;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  return <ProductDetail productId={productId} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Kiểm tra nếu context.params tồn tại
  const { id } = context.params || {}; 

  if (!id) {
    return {
      notFound: true, // Nếu không tìm thấy id, trả về trang 404
    };
  }

  return {
    props: {
      productId: id as string,
    },
  };
};
