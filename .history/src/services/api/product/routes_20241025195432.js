import { NextResponse } from 'next/server';

// Giả định dữ liệu sản phẩm
const products = [
  {
    id: "1",
    name: "iPhone 15 Plus 512GB",
    price: "30,890,000₫",
    discount_price: "31,000,000₫",
    images: [
      "/assets/product-image-1.jpg",
      "/assets/product-image-2.jpg",
      "/assets/product-image-3.jpg"
    ],
    colors: ["Pink", "Blue", "White", "Green", "Yellow"],
    storage: ["128GB", "256GB", "512GB"],
    specifications: [
      "Operating System: iOS 17",
      "Mobile Network: 2G, 3G, 4G, 5G",
      "Internal Storage: 256GB",
      "Camera Resolution: Main Camera: 48MP f/1.6 aperture, Ultra Wide: 12MP f/2.4 aperture",
      "SIM Slots: Dual SIM (nano-SIM and eSIM)",
      "Processor: Apple A16 Bionic",
      "Display Technology: Super Retina XDR",
      "Resolution: 2796 x 1290",
      "Screen Size: 6.7 inches"
    ],
    description: "iPhone 15 Plus offers a stunning design and powerful performance."
  }
];

export async function GET(request, { params }) {
  const { product_id } = params;
  const product = products.find(p => p.id === product_id);

  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
}
