import axios from 'axios';

export const fetchProductDetails = async (productId: string) => {
  try {
    const response = await axios.get(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
};
