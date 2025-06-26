import { Link } from "@inertiajs/react";
import { FaCheckCircle } from "react-icons/fa";

interface SuccessProps {
    booking?: {
        id: number;
        package: {
            name: string;
            duration: string;
        };
        departure: {
            departure_date: string;
        };
        number_of_person: number;
        totalPrice: number;
    };
}

export default function Success({ booking }: SuccessProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg border-[1px] border-gray-300 p-8">
                    <div className="text-center flex flex-col items-center">
                        <img src="/images/success.png" className="w-[30rem]" />
                        <h2 className="mt-4 text-3xl  font-bold text-green-500">
                            Booking Confirmed!
                        </h2>
                        <p className="mt-2 text-lg text-gray-600">
                            Thank you for choosing our travel package. Your booking has been successfully confirmed.
                            <br></br>
                            We will contact your shortly.
                        </p>
                    </div>

                 

                    <div className="mt-8 flex justify-center space-x-4">
                        <Link
                            href={route('home')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Return to Home
                        </Link>
                        <Link
                            href={route('bookingHistory.show')}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            View Bookings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}