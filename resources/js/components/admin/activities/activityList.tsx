import { activity } from "@/types/types";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ActivityCardProps {
    activity: activity;
    onEdit: (activity: activity) => void;
    onDelete: (activity: activity) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onEdit, onDelete }) => {
  const handleDelete = () => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${activity.name}"?`);
    if (isConfirmed) {
      onDelete(activity);
    }
  };

  return (
    <div className="flex flex-col bg-white border w-full border-gray-300 rounded-xl p-4 gap-4 shadow-sm">
      {/* Header: Title + Actions */}
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-800">{activity.name}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(activity)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit activity"
          >
            <FaEdit size={20} />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete activity"
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">{activity.description}</p>

      {/* Footer: Metadata */}
      <div className="text-gray-500 flex justify-between items-center text-sm">
        <span className="mr-4">Created: {new Date(activity.created_at).toLocaleDateString()}</span>
        <span>Updated: {new Date(activity.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ActivityCard; 