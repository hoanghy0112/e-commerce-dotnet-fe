import axios from "axios";
import { API_URLS } from "@/config/api-urls";
import useAuthStore from "@/stores/auth.store";

export const getProductReviews = async (productId: string) => {
  const response = await axios.get(
    `${API_URLS.review.getReview.replace("{productId}", productId)}`
  );
  return response.data;
};

export const createReview = async (
  productId: string,
  content: string,
  rating: number
) => {
  // Simply send the token, it will be checked on the server
  const token = useAuthStore.getState().token;
  if (rating < 1) rating = 1;
  if (rating > 5) rating = 5;
  if (!rating) rating = 1;
  if (!content) content = "No content";
  const response = await axios.post(
    API_URLS.review.createReview,
    {
      productId,
      content,
      rating,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateReview = async (
  reviewId: string,
  content: string,
  rating: number
) => {
  const token = useAuthStore.getState().token;
  if (rating < 1) rating = 1;
  if (rating > 5) rating = 5;
  if (!rating) rating = 1;
  if (!content) content = "No content";
  const response = await axios.put(
    `${API_URLS.review.updateReview.replace("{reviewId}", reviewId)}`,
    {
      content,
      rating,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteReview = async (reviewId: string) => {
  const token = useAuthStore.getState().token;
  const response = await axios.delete(
    `${API_URLS.review.deleteReview.replace("{reviewId}", reviewId)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
