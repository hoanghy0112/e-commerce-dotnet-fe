import { API_URLS } from "@/config/api-urls";
import useAuthStore from "@/stores/auth.store";

export const createCategoryAPI = async (categoryName: string) => {
  const token = useAuthStore.getState().token;
  const res = await fetch(API_URLS.admin.addCategory, {
    method: "POST",
    body: JSON.stringify(categoryName),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to create category");
  return await res.json();
};

export const deleteCategoryAPI = async (categoryId: number) => {
  const token = useAuthStore.getState().token;
  const res = await fetch(`${API_URLS.admin.deleteCategory}/${categoryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete category");
};
