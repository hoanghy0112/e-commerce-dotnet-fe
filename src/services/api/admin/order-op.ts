import useAuthStore from "@/stores/auth.store";
import { API_URLS } from "@/config/api-urls";

interface OrderAdminParams {
  status?: string;
  userId?: number;
  paymentMethod?: string;
  page?: number;
  limit?: number;
}

export const getOrdersAdmin = async ({
  status = "",
  userId,
  paymentMethod = "",
  page = 1,
  limit = 10,
}: OrderAdminParams = {}) => {
  // Provide default empty object in function parameter
  const token = useAuthStore?.getState()?.token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  let total = 0;
  let orders = [];

  const res = await fetch(
    API_URLS.admin.getOrders +
      `?status=${status}&userId=${
        userId ?? ""
      }&paymentMethod=${paymentMethod}&page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch orders. Status: ${res.status}`);
  }

  // Extract the "X-Total-Count" header and assign to total
  const totalCountHeader = res.headers.get("X-Total-Count");
  if (totalCountHeader) {
    total = parseInt(totalCountHeader, 10);
  }

  // Parse the response body as JSON
  orders = await res.json();

  return { total, orders };
};

export const processOrder = async (orderId: number) => {
  const token = useAuthStore?.getState()?.token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  const res = await fetch(
    API_URLS.admin.processOrder.replace("orderId", orderId.toString()),
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to process order");
  return await res.json();
};

export const processDelivered = async (orderId: number) => {
  const token = useAuthStore?.getState()?.token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  const res = await fetch(
    API_URLS.admin.processDelivered.replace("orderId", orderId.toString()),
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to process order");
  return await res.json();
};

export const cancelOrder = async (orderId: number) => {
  const token = useAuthStore?.getState()?.token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  const res = await fetch(
    API_URLS.admin.cancelOrder.replace("orderId", orderId.toString()),
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to cancel order");
  return await res.json();
};
