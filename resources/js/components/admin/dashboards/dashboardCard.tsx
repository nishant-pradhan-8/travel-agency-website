import React from 'react';

export default function DashboardCard({
    icon,
    name,
    amount,
}: {
    icon: React.ReactNode;
    name: string;
    amount: number;
}) {
    return (
        <div className="flex flex-col items-start gap-4">
            <div className="bg-teal-400 p-2 rounded-full text-teal-800">{icon}</div>
            <div>
                <p className="text-sm text-gray-500">{name}</p>
                <div className="flex flex-row items-center gap-2">
                    <h2 className="text-2xl font-bold text-gray-900">{amount}</h2>
                </div>
            </div>
        </div>
    );
}

// 