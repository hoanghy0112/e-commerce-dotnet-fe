export async function getProductDetailAPI(productId: string) {
    // Mock data cho chi tiết sản phẩm
    const mockData = {
      id: productId,
      name: "Iphone 15 Plus 512GB",
      price: 30890000,
      discount_price: 28890000,
      images: [
        "/images/iphone15plus.jpg", // Hình ảnh sản phẩm
      ],
      colors: ["Pink", "Blue", "White", "Green", "Yellow"],
      storage: ["128GB", "256GB", "512GB"],
      specifications: [
        "Operating System: iOS 17",
        "Mobile Network: 2G, 3G, 4G, 5G",
        "Internal Storage: 256GB",
        "Camera Resolution: Main Camera: 48MP / f1.6 aperture",
        "SIM Slots: Dual SIM (nano-SIM and eSIM)",
        "Processor: Apple A16 Bionic",
        "Display Technology: Super Retina XDR",
        "Resolution: 2796 x 1290",
        "Screen Size: 6.7 inches",
      ],
      description: "Overview of Iphone 15 Plus: Stunning Colors, Outstanding Performance...",
    };
  
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 1000); // Mock delay 1 giây
    });
  }
  