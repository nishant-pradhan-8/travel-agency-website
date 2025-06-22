import { destination } from "@/types/types";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface DestinationCardProps {
    destination: destination;
    onEdit: (destination: destination) => void;
    onDelete: (destination: destination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onEdit, onDelete }) => {
  const handleDelete = () => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${destination.name}"?`);
    if (isConfirmed) {
      onDelete(destination);
    }
  };

  return (
    <div className="flex flex-col bg-white border w-full border-gray-300 rounded-xl p-4 gap-4 shadow-sm">
      {/* Header: Title + Actions */}
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-800">{destination.name}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(destination)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit destination"
          >
            <FaEdit size={20} />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete destination"
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">{destination.description}</p>

      {/* Footer: Metadata */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Created: {new Date(destination.created_at).toLocaleDateString()}</span>
        <span>Updated: {new Date(destination.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default DestinationCard;
