import { BookingGraphData } from '@/types/types';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import axios from 'axios';

export default function RevenueChart() {
    const [selectedFilter, setSelectedFilter] = useState<string>('yearly');
    const [bookingsData, setBookingsData] = useState<BookingGraphData[]>([]);

    useEffect(() => {
        axios.get(route('admin.analytics', { timeFrame: selectedFilter }), {
            withCredentials: true
        })
        .then((response) => {
            if (response.data.success && response.data.data) {
                setBookingsData(response.data.data);
            }
        })
        .catch(() => {
            window.alert('Unable to Get Booking Analytics. Please Try again later.');
        });
    }, [selectedFilter]);

    return (
        <div className="h-full rounded-xl border-[1px] border-gray-300 bg-white p-4">
            <div className="mt-4 mb-8 flex flex-row justify-between">
                <h2 className="text-[1rem] font-bold text-teal-800">Bookings Overview</h2>

                <div className="flex flex-row gap-2 text-[0.9rem] text-teal-800">
                    <button
                        onClick={() => setSelectedFilter('weekly')}
                        className={`cursor-pointer font-semibold ${selectedFilter === 'weekly' ? 'underline' : ''}`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setSelectedFilter('monthly')}
                        className={`cursor-pointer font-semibold ${selectedFilter === 'monthly' ? 'underline' : ''}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setSelectedFilter('yearly')}
                        className={`cursor-pointer font-semibold ${selectedFilter === 'yearly' ? 'underline' : ''}`}
                    >
                        Yearly
                    </button>
                </div>
            </div>
            <div>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={bookingsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <defs>
                            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="label" textAnchor="end" interval={bookingsData.length > 12 ? Math.floor(bookingsData.length / 12) : 0} />
                        <YAxis />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Tooltip />
                        <Area type="monotone" dataKey="Bookings" stroke="#8884d8" fillOpacity={1} fill="url(#colorBookings)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
