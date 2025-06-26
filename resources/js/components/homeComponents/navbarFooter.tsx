import { MyPageProps } from '@/types/types';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';

const NavbarFooter = () => {
  const { destinations, activities } = usePage<MyPageProps>().props;
  return (
    <nav className="flex items-start  m-auto max-w-[1440px] justify-between px-4 py-12 bg-transparent text-black">

      <div className="text-xl font-bold relative">
        <span className="text-black">Moksh Travel.</span>
        
        <img  className='w-[4rem]' src='/images/logodec.png'/>
     </div>

    <div className='flex flex-row gap-6 items-center'>
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Destinations</h4>
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {destinations && destinations.length > 0 ? (
              destinations.map((destination) => (
                <Link href={route('destinationPackages.show',destination.id)} key={destination.id} className="hover:text-lime-400  text-gray-600 cursor-pointer">
                  {destination.name}
                </Link>
              ))
            ) : (
              <li>No Destinations Currently</li>
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Activities</h4>
          <ul className="flex flex-col gap-1  text-sm font-medium">
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <Link href={route('activityPackages.show',activity.id)} key={activity.id} className="hover:text-lime-400   text-gray-600  cursor-pointer">
                  {activity.name}
                </Link>
              ))
            ) : (
              <li>No Activities Currently</li>
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-2"><Link href={route("package.clientIndex")}>Packages</Link></h4>
        
        </div>
      </div>
    
    </div>
    </nav>
  );
};

export default NavbarFooter;
