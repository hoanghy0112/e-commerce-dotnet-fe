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

export const PromotionTable: React.FC<{
  promotions: Promotion[];
  onEdit: (promotion: Promotion) => void;
  onDelete: (id: number) => Promise<void>;
}> = ({ promotions, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Discount</th>
            <th className="px-4 py-2">Valid Until</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {promotions
            .sort((a, b) => b.priority - a.priority)
            .map((promotion) => (
              <tr key={promotion.id}>
                <td className="border px-4 py-2">{promotion.name}</td>
                <td className="border px-4 py-2">{promotion.description}</td>
                <td className="border px-4 py-2">
                  {promotion.discountPercentage}%
                </td>
                <td className="border px-4 py-2">{promotion.validUntil}</td>
                <td className="border px-4 py-2">{promotion.priority}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => onEdit(promotion)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => onDelete(promotion.id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
