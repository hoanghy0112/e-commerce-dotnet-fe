export async function getProductDetailAPI(productId: string) {
    // Mock dữ liệu chi tiết sản phẩm dựa trên productId
    const mockData = {
      id: productId,
      name: `Product ${productId}`,
      price: 100000 + Number(productId) * 5000,
      discount_price: 80000 + Number(productId) * 4000,
      images: [
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA...", // Ảnh mock (base64 hoặc URL)
      ],
      colors: ["Red", "Blue", "Green"],
      storage: ["64GB", "128GB", "256GB"],
      specifications: [
        "Operating System: iOS 17",
        "Camera Resolution: 48MP",
        "Screen Size: 6.7 inches",
      ],
      description: `This is the detailed description of Product ${productId}`,
    };
  
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 1000); // Mock delay 1 giây
    });
  }
  