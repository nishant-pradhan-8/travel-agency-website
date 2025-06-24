import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LayersIcon from '@mui/icons-material/Layers';
import { Package, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';

import Person2Icon from '@mui/icons-material/Person2';
const navigation = [
 
  {
    kind: 'header',
    title: 'Travel',
  },
  {
    segment: 'admin/dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'admin/bookings',
    title: 'Bookings',
    icon: <Ticket />,
  },
   {
    segment: 'admin/destinations',
    title: 'Destinations',
    icon: <BeachAccessIcon />,
    
  },
   {
    segment: 'admin/activities',
    title: 'Activities',
    icon: <img src='/images/activityIcon.svg' className='w-8 h-8 filter:brightness-0 invert-[1]' />,
  },
  {
    segment: 'admin/packages',
    title: 'Packages',
    icon: <img src='/images/package.svg' className='w-8 h-8'  />,
  },
  {
    segment: 'admin/departures',
    title: 'Departures',
    icon: <DepartureBoardIcon />,
  },
 
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Customer',
  },

  {
    segment: 'admin/users',
    title: 'Customers',
    icon: <Person2Icon />,
  },
];


interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

export default function DashboardLayoutBasic(props: Props) {
  const { window } = props;
  const { url } = usePage();
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-teal-950 text-white transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen ? (
            <div className="relative text-xl font-bold">
              <h1 className="text-white">Moksh Travel.</h1>
              <img className="w-[4rem]" src="/images/logodec.png" />
            </div>
          ) : (
            <h1 className="text-white font-bold text-xl">MT</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-teal-800 transition-colors"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        
        <nav className="mt-4">
          {navigation.map((item, index) => {
            if (item.kind === 'divider') {
              return <div key={index} className="my-2 border-t border-gray-700" />;
            }
            if (item.kind === 'header') {
              return isOpen ? (
                <div key={index} className="px-4 py-2 text-sm font-semibold text-gray-400">
                  {item.title}
                </div>
              ) : null;
            }
            
            const isActive = url.startsWith(`/${item.segment}`);
            
            return (
              <div key={index}>
                <Link
                  href={`/${item.segment}`}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm",
                    isActive ? "bg-teal-800 text-white" : " hover:bg-teal-800 hover:text-white",
                    !isOpen && "justify-center"
                  )}
                  title={!isOpen ? item.title : undefined}
                >
                  <span className={cn("mr-3", !isOpen && "mr-0")}>{item.icon}</span>
                  {isOpen && item.title}
                </Link>
                
               
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {props.children}
      </div>
    </div>
  );
}
