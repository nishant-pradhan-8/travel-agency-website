import { PageProps } from '@inertiajs/core';
export interface destination {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface activity {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface MyPageProps extends PageProps {
    destinations: destination[];
    activities: activity[];
}

export interface Package {
    id: number;
    name: string;
    description: string;
    image: string | File | null;
    price: string;
    discount: number;
    duration: string;
    destination_id: number;
    activity_id: number;
    created_at: string;
    updated_at: string;
}
export interface PackageWithRelations extends Package {
    destination: info;
    activity: info;
  }

  
export interface info {
    id: string;
    name: string;
    description?: string;
}

export interface review {
    id: string;
    user_id: string;
    package_id: string;
    review: string;
    rating: string;
    user: {
        id: string;
        full_name: string;
    };
    created_at: string;
    updated_at: string;
}

export interface Departure {
    id: number;
    package_id: number;
    price: number;
    departure_date: string;
    available_slots: number;
    created_at: string;
    updated_at: string;
    package?:{
        id:number,
        name:string,
    }
}

export interface FormData {
    noOfPeople: number;
    departureId: number | null;
    messege: string;
    totalPrice: number | null;

    [key: string]: any;
}

export interface BookingHistory {
    booking_status: 'cancelled' | 'booked';
    created_at: string;
    departure: {
        id: number;
        departure_date: string;
    };
    departure_id: number;
    id: number;
    messege: string | null;
    number_of_person: number;
    package: {
        id: number;
        name: string;
    };
    user: {
        id: number;
        full_name: string;
    };
    package_id: number;
    payment_status: 'paid' | 'refunded' | 'unpaid';
    totalPrice: number;
    updated_at: string;
    user_id: number;
}

export interface SharedProps extends PageProps {
    env: {
        APP_URL: string;
    };
}

export interface PopularInfo{
    id: number, 
    name: string,
    count: string
}

export interface BookingGraphData{
    label: string,
    Bookings: number
}

export interface User {
    account_status:string;
    address: string;
    created_at: string;
    email: string;
    full_name: string;
    id: number;
    isAdmin: number; 
    phone: string;
    profile_picture: string;
    updated_at: string;
  }
