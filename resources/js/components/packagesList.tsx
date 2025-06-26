
import { Package, PackageWithRelations, info } from '@/types/types';
import { Link } from '@inertiajs/react';

const PackagesList = ({ packages}:{ packages: PackageWithRelations[]}) => {
 

    return (
        <div className='grid grid-cols-3  gap-4   mt-8'>
            {
                packages.map((pac)=>(
 <Link href={route("package.show",pac.id)} key={pac.id} className="card bg-base-100  rounded-xl border-[1px] border-gray-300 transform transition duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="h-[15rem] w-full rounded-xl bg-gray-300"></div>

                <div className="card-body flex flex-col gap-2 p-4">
                   <div className='flex flex-row justify-between items-start'>
                     <h2 className="card-title text-xl font-semibold text-wrap text-black">{pac.name}- {pac.duration}</h2>
                     <div className='bg-teal-800 rounded-2xl text-[0.8rem] px-4 py-2'>
                        {pac.discount}% Discount
                    </div>
                     </div>
                    <h3 className="text-[1rem] font-semibold text-black">{pac.destination.name}, Nepal</h3>

                    <p className="text-primary font-bold">${pac.price}/ Person</p>
                </div>
            </Link>
                ))
            }
           
        </div>
    );
};

export default  PackagesList;
