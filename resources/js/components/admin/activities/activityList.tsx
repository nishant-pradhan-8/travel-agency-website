import { activity } from '@/types/types';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
        <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
            {/* Header: Title + Actions */}
            <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-gray-800">{activity.name}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(activity)}
                        className="cursor-pointer rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                        title="Edit activity"
                    >
                        <FaEdit size={20} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="cursor-pointer rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                        title="Delete activity"
                    >
                        <FaTrash size={20} />
                    </button>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600">{activity.description}</p>

            {/* Footer: Metadata */}
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="mr-4">Created: {new Date(activity.created_at).toLocaleDateString()}</span>
                <span>Updated: {new Date(activity.updated_at).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default ActivityCard;
