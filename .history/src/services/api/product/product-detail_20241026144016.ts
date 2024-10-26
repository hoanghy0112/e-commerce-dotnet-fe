export async function getProductDetailAPI(productId: string) {
    // Mock data cho chi tiết sản phẩm
    const mockData = {
      id: productId,
      name: "Iphone 15 Plus 512GB",
      price: 30890000,
      discount_price: 28890000,
      images: [
        "data:image/jpeg;base64,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",
        "data:image/jpg;base64,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"
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
      description: "Maintaining the modern square design similar to its predecessors, the iPhone 15 Plus is a perfect choice for users who want a balanced size. It’s not too small like the iPhone 15 or overly expensive like the iPhone 15 Pro Max. Additionally, it comes in three storage options: 128GB/256GB/512GB, offering a wide range of choices for iPhone users..",
      productList: [
        {
          id: 0,
          name: "Product 1",
          image: "data:image/jpeg;base64,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",
          price: 100000,
          discount_price: 50000,
          rating: 4.5,
          availability: true,
          storage: ["<string>", "<string>"],
          colors: ["<string>", "<string>"],
        },
        {
          id: 1,
          name: "Product 2",
          image: "data:image/jpeg;base64,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",
          price: 100000,
          discount_price: 90000,
          rating: 4.5,
          availability: true,
          storage: ["<string>", "<string>"],
          colors: ["<string>", "<string>"],
        },
      ],
    };
  
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 1000); 
    });
  }
  