import { activity, destination } from '@/types/types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react'

export default function MenuDropdown({menuItemOpt, menuItem, linkTo}:{menuItemOpt:destination[] | activity[], menuItem:string, linkTo:string}) {
  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex cursor-pointer bg-transparent items-center gap-2 rounded-md text-sm/6 font-semibold text-white shadow-inner  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white ">
          {menuItem}
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          
          anchor="bottom end"
          className="w-52 origin-top-right z-50 bg-gray-800 rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
            {
                menuItemOpt.map((item)=>(
 <MenuItem key={item.id}>
            <Link href={route(linkTo,item.id)} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
   
              {item.name}

            </Link>
          </MenuItem>
                ))
            }
      
        </MenuItems>
      </Menu>
    </div>
  )
}
