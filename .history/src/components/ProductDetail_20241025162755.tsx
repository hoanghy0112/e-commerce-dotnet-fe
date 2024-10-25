import React from 'react';

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    discount_price: number;
    options: string[];
    colors: string[];
    description: string;
    specifications: { [key: string]: string };
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home &gt; iPhone &gt; iPhone 15 Series &gt; {product.name}
      </div>

      {/* Main Product Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-2">
            <span className="text-red-500 text-2xl font-bold mr-2">
              {product.discount_price.toLocaleString()}đ
            </span>
            <span className="line-through text-gray-500">
              {product.price.toLocaleString()}đ
            </span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">{'★'.repeat(5)}</span>
            <span className="ml-2 text-gray-500">5/5</span>
          </div>

          {/* Options */}
          <div className="mb-4">
            <span className="block font-semibold mb-2">Choose Option</span>
            <div className="flex gap-2">
              {product.options.map((option) => (
                <button
                  key={option}
                  className="border px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-4">
            <span className="block font-semibold mb-2">Choose Color</span>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === 'Pink'
                      ? 'bg-pink-500'
                      : color === 'Green'
                      ? 'bg-green-500'
                      : color === 'White'
                      ? 'bg-white'
                      : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center mb-6">
            <button className="border px-2 py-1">-</button>
            <span className="px-4">1</span>
            <button className="border px-2 py-1">+</button>
          </div>

          {/* Add to Cart */}
          <button className="w-full bg-black text-white py-3 rounded-lg">
            Add to cart
          </button>
        </div>
      </div>

      {/* Product Details & Specifications */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Description */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <p>{product.description}</p>
        </div>

        {/* Specifications */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Specifications</h2>
          <ul>
            {Object.entries(product.specifications).map(([key, value]) => (
              <li key={key} className="flex justify-between py-1">
                <span className="font-semibold">{key}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
