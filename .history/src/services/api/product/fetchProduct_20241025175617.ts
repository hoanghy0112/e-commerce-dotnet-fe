export const fetchProductDetails = async (productId: string) => {
    try {
      const response = await fetch(`m/product/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };
  