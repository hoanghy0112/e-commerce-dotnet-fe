"use client";

import { useState, useEffect } from "react";
import { PromotionTable } from "@/components/Admin/Promotions/PromotionTable";
import { CreatePromotionForm } from "@/components/Admin/Promotions/CreatePromotionForm";
import { EditPromotionForm } from "@/components/Admin/Promotions/EditPromotionForm";
import {
  deletePromotion,
  getPromotionsFromAdmin,
} from "@/services/api/admin/promotion-op";

interface Promotion {
  id?: number;
  name: string;
  description: string;
  image: string;
  discountPercentage: number;
  validUntil: string;
  priority: number;
  applicableProductIds: number[];
}

const PromotionPanel: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(
    null
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const data = await getPromotionsFromAdmin();
    setPromotions(data);
  };

  const handleEdit = (promotion: Promotion) => {
    setCurrentPromotion(promotion);
    setShowEditForm(true);
  };

  const handleDelete = async (id: number) => {
    await deletePromotion(id);
    fetchPromotions();
  };

  const handleCreateNew = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setCurrentPromotion(null);
    setShowCreateForm(false);
    setShowEditForm(false);
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Promotion Management</h1>
        <button
          className="bg-black-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleCreateNew}
        >
          New Promotion
        </button>

        {/* Table Section */}
        <PromotionTable
          promotions={promotions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      {/* Render create form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
            <CreatePromotionForm
              fetchPromotions={fetchPromotions}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}

      {/* Render edit form */}
      {showEditForm && currentPromotion && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg ">
            <EditPromotionForm
              promotion={currentPromotion}
              fetchPromotions={fetchPromotions}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionPanel;
