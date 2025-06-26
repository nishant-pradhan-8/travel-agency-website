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

export default function MainDashboard({
    topDestinations,
    topActivities,
    customerCount,
    packageCount,
    newBookings,
}: {
    topDestinations: PopularInfo[];
    topActivities: PopularInfo[];
    customerCount: number;
    packageCount: number;
    newBookings: number;
}) {
    const dashboardCards: DashboradCard[] = [
        {
            icon: <Ticket />,
            name: 'New Bookings',
            amount: newBookings,
        },
        {
            icon: <Person2Icon />,
            name: 'Total Customers',
            amount: customerCount,
        },

        {
            icon: <BackpackIcon />,
            name: 'Total Packages',
            amount: packageCount,
        },
    ];
    console.log(topDestinations);
    return (
        <div className="flex w-full max-w-[1440px] flex-row gap-4">
            <div className='flex flex-col gap-4 flex-1'>
                <div className="flex flex-row gap-4">
                    {dashboardCards.map((card, idx) => (
                        <div
                            className={`div${idx + 1} flex min-w-[250px] items-center rounded-xl border-[1px] border-gray-300 bg-white p-4`}
                            key={card.name}
                        >
                            <DashboardCard icon={card.icon} name={card.name} amount={card.amount} />
                        </div>
                ))}
                </div>

                <div className="">
                    <RevenueChart />
                </div>
            </div>
            <div className='flex flex-col gap-4 flex-1'>
 
                <PopularCard info={topDestinations} source="Destinations" />
 
      
                <PopularCard info={topActivities} source="Activites" />
 
            </div>

          
        </div>
    );
}
