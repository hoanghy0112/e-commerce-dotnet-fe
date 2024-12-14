"use client";

import { useState, useEffect } from "react";
import ProductFormModal from "@/components/Admin/ProductFormModal";
import {
  deleteProduct,
  getAdminProducts,
} from "@/services/api/admin/product-op";
import Image from "next/image";

import EDIT_ICON from "@/assets/icons/edit-02.svg";
import DELETE_ICON from "@/assets/icons/trash-01.svg";
import Pagination from "@/components/Pagination";
export default function Products() {
  const [products, setProducts] = useState<IAdminProduct[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<IAdminProduct | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAdminProducts({
        page,
        limit,
      });
      setTotalPage(Math.ceil(response.total / limit));
      setProducts(response.products as IAdminProduct[]);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  const handleDeleteProduct = async (id: number) => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        await deleteProduct(id.toString());
        fetchProducts(); // Refresh the product list after deletion
      }
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const openModal = (product: IAdminProduct | null = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    fetchProducts(); // Refresh products after save
  };
  const formatPrice = (price: number) => {
    // To vnd, in style of 1,000,000 VND
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Products</h1>
      <button
        onClick={() => openModal(null)}
        className="bg-black-500 text-white px-4 py-2 rounded mb-4"
      >
        New +
      </button>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border"> Discounted ?</th>
            <th className="px-4 py-2 border">Categories</th>
            <th className="px-4 py-2 border">Available</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{formatPrice(product.price)}</td>
              <td className="border px-4 py-2">
                {product.discountPrice
                  ? formatPrice(product.discountPrice)
                  : "No"}
              </td>
              <td className="border px-4 py-2">
                {product.categories.map((category) => category.name).join(", ")}
              </td>
              {/* Todo: Change after inven tracking implementation */}
              <td className="border px-4 py-2">50</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => openModal(product)}
                  className=" px-2 py-1 rounded mr-2"
                >
                  <Image src={EDIT_ICON} alt="Edit" width={16} height={16} />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className=" px-2 py-1 rounded"
                >
                  <Image
                    src={DELETE_ICON}
                    alt="Delete"
                    width={16}
                    height={16}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
          onItemsPerPageChange={handleLimitChange}
          itemsPerPage={limit}
        />
      </div>
      {isModalOpen && (
        <ProductFormModal product={selectedProduct} closeModal={closeModal} />
      )}
    </div>
  );
}
