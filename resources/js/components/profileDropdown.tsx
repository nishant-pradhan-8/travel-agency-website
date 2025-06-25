import { activity, destination } from '@/types/types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { Link, router } from '@inertiajs/react'

export default function ProfileDropdown(){
  const handleLogout = ()=>{
    router.post(route('logout'));
  }
    return(
         <Menu>
                <MenuButton className="inline-flex cursor-pointer bg-transparent items-center gap-2 rounded-md text-sm/6 font-semibold text-white shadow-inner  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white ">
                  <div className='bg-white flex items-center justify-center rounded-full h-8 w-8'>
                    <img src="/images/profile.svg" className='w-6 h-6' />
                  </div>
                </MenuButton>
        
                <MenuItems
                  transition
                  
                  anchor="bottom end"
                  className="w-52 origin-top-right z-50 bg-gray-800 rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                >
                    <MenuItem>
                    <Link href={route('profile.show',1)} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
           
                      Profile
        
                    </Link>
                  </MenuItem>
         <MenuItem>
                    <Link href={route('bookingHistory.show')} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
           
                      Booking History
        
                    </Link>
                  </MenuItem>
                      <MenuItem>
                    <button onClick={handleLogout}  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
           
                      Logout
        
                    </button>
                  </MenuItem>
                   
                
              
                </MenuItems>
              </Menu>
    )
}