"use client";
import { useEffect, useState } from "react";
import { editPromotion } from "@/services/api/admin/promotion-op";

interface Promotion {
  id: number;
  name: string;
  description: string;
  image: string;
  discountPercentage: number;
  validUntil: string;
  priority: number;
  applicableProductIds: number[];
}

export const EditPromotionForm: React.FC<{
  promotion: Promotion;
  fetchPromotions: () => Promise<void>;
  onClose: () => void;
}> = ({ promotion, fetchPromotions, onClose }) => {
  const [formState, setFormState] = useState<Promotion>(promotion);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  useEffect(() => {
    if (formState?.image) {
      setPreviewBanner(formState.image);
    } else {
      setPreviewBanner(null);
    }
  }, [formState]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormState({ ...formState, image: value });
    setPreviewBanner(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editPromotion(formState.id, formState);
    fetchPromotions();
    onClose();
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4">Edit Promotion</h2>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={handleFormChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="discountPercentage"
        >
          Discount Percentage
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="discountPercentage"
          type="number"
          name="discountPercentage"
          value={formState.discountPercentage}
          onChange={handleFormChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="validUntil"
        >
          Valid Until
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="validUntil"
          type="date"
          name="validUntil"
          value={formState.validUntil.split("T")[0]}
          onChange={handleFormChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="priority"
        >
          Priority
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="priority"
          type="number"
          name="priority"
          value={formState.priority}
          onChange={handleFormChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          value={formState.description}
          onChange={handleFormChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="image"
        >
          Banner Image URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="text"
          name="image"
          value={formState.image}
          onChange={handleImagePreview}
          required
        />
      </div>

      {previewBanner && (
        <div className="mb-4">
          <h3 className="text-gray-700 text-sm font-bold mb-2">Preview:</h3>
          <div
            className="relative h-48 w-full bg-cover bg-center rounded"
            style={{ backgroundImage: `url(${previewBanner})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white font-bold text-lg">
                {formState.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
