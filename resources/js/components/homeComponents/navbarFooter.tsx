import React from 'react';

const NavbarFooter = () => {
  return (
    <nav className="flex items-center  m-auto max-w-[1440px] justify-between px-4 py-12 bg-transparent text-black">

      <div className="text-xl font-bold relative">
        <span className="text-black">Moksh Travel.</span>
        
        <img  className='w-[4rem]' src='/images/logodec.png'/>
     </div>

    <div className='flex flex-row gap-6 items-center'>

      <ul className="hidden md:flex gap-6 text-sm font-medium">
        <li className="hover:text-lime-400 cursor-pointer">Places</li>
        <li className="hover:text-lime-400 cursor-pointer">About</li>
        <li className="hover:text-lime-400 cursor-pointer">Blog</li>
        <li className="hover:text-lime-400 cursor-pointer">Contact</li>
      </ul>

   
      <button className="border border-black rounded-full px-4 py-1 hover:bg-black cursor-pointer hover:text-[white] transition text-sm">
        Take a Trip
      </button>
    </div>
    </nav>
  );
};

export default NavbarFooter;
