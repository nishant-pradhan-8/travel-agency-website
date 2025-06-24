import { PopularInfo } from '@/types/types';
import BackpackIcon from '@mui/icons-material/Backpack';
import Person2Icon from '@mui/icons-material/Person2';
import { Ticket } from 'lucide-react';
import React from 'react';
import DashboardCard from './dashboardCard';
import PopularCard from './popularCard';
import RevenueChart from './revenueChart';
export interface DashboradCard {
    icon: React.ReactNode;
    name: string;
    amount: number;
}
const dashboardCards: DashboradCard[] = [
    {
        icon: <Ticket />,
        name: 'New Bookings',
        amount: 350,
    },
    {
        icon: <Person2Icon />,
        name: 'Total Customers',
        amount: 100,
    },

    {
        icon: <BackpackIcon />,
        name: 'Total Packages',
        amount: 24,
    },
];
export default function MainDashboard({ topDestinations, topActivities }: { topDestinations: PopularInfo[]; topActivities: PopularInfo[] }) {
    return (
        <div className="dashboard-parent w-full max-w-[1440px]">
            {dashboardCards.map((card, idx) => (
                <div className={`div${idx + 1} bg-white  flex items-center rounded-xl border-[1px] border-gray-300 p-4`} key={card.name}>
                    <DashboardCard details={card} />
                </div>
            ))}

            <div className="dashboard-div4">
                <RevenueChart />
            </div>
            <div className="dashboard-div5 ">
                <PopularCard info={topDestinations} source="Destinations" />
            </div>
            <div className="dashboard-div6">
                <PopularCard info={topActivities} source="Activites" />
            </div>
        </div>
    );
}
