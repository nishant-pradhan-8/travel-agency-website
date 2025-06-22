import { activity, destination } from '@/types/types';
import { MyPageProps } from '@/types/types';
import { Link, usePage } from '@inertiajs/react';
import MenuDropdown from './menuDropdown';
import ProfileDropdown from '../profileDropdown';
const Navbar = () => {
 

    const { destinations, activities } = usePage<MyPageProps>().props;

    return (
        <nav className="flex items-center justify-between bg-transparent px-4 py-4 text-white">
            <div className="relative text-xl font-bold">
            <a href={`${route("home")}`} className="text-white">Moksh Travel.</a>

                <img className="w-[4rem]" src="/images/logodec.png" />
            </div>

      
                <ul className="hidden  gap-6 text-sm font-medium md:flex md:items-center">
                    <li className="cursor-pointer  hover:text-lime-400">
                       { destinations && <MenuDropdown menuItemOpt={destinations} menuItem="Destinations" linkTo="destinationPackages.show" /> }
                    </li>
                    <li className="cursor-pointer hover:text-lime-400">
                       { activities && <MenuDropdown menuItemOpt={activities} menuItem="Activities"  linkTo="activityPackages.show" />}
                    </li>
                    <li className="cursor-pointer hover:text-lime-400">
                        <Link href={route("package.clientIndex")}>
                        Travel Packages
                        </Link></li>
                    <li className="cursor-pointer hover:text-lime-400">
                      <ProfileDropdown />
                    </li>
                </ul>

     
        </nav>
    );
};

export default Navbar;
