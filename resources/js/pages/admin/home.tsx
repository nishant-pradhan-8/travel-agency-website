import MainDashboard from '@/components/admin/dashboards/mainDashboard';
import AdminLayout from '@/layouts/admin/admin-layout';
import { PopularInfo } from '@/types/types';
import { ReactNode } from 'react';

export default function AdminDashboard({topDestinations,topActivities, customerCount, packageCount, newBookings}:{topDestinations:PopularInfo[],topActivities:PopularInfo[], customerCount:number, packageCount:number, newBookings:number}) {

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-teal-800">Dashboard Overview</h1>
            </div>

            <MainDashboard customerCount={customerCount}  packageCount={packageCount} newBookings={newBookings} topDestinations={topDestinations} topActivities={topActivities}  />
        </div>
    );
}

AdminDashboard.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
