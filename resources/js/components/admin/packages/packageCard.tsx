import { PackageWithRelations, SharedProps } from '@/types/types';
import { usePage } from '@inertiajs/react';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useAppContext } from '@/contexts/appContext';
const PackageCard: React.FC<{
    packageInfo: PackageWithRelations;
    onView: () => void;
    onDelete:(selectedPackage:PackageWithRelations)=>void;
}> = ({ packageInfo, onView, onDelete }) => {
    const {APP_URL} = useAppContext();
  
    return (
        <div className="flex h-[250px] w-full gap-4 overflow-hidden rounded-xl border-[1px] border-gray-300 bg-white p-4">
            {/* Left Image */}
            <div className="w-1/3">
                {packageInfo.image ? (
                    <img
                        src={typeof packageInfo.image === 'string' ? `${APP_URL}/storage/${packageInfo.image}` : ''}
                        alt={packageInfo.name}
                        className="h-full w-full rounded-lg object-cover"
                    />
                ) : (
                    <div className="h-full w-full rounded-lg bg-gray-400" />
                )}
            </div>

            {/* Right Content */}
            <div className="flex w-2/3 flex-col justify-between">
                {/* Title and Like */}
                <div>
                  <div className='flex flex-row justify-between'>
                  <h2 className="text-xl font-bold text-gray-800">{packageInfo.name}</h2>
                  <button onClick={()=>onDelete(packageInfo)} ><DeleteIcon className='text-teal-800 cursor-pointer' /></button>
                  </div>
                   
                    <p className="mt-2 line-clamp-5 overflow-hidden text-sm text-gray-600">{packageInfo.description}</p>
                </div>

                {/* Footer */}
                <div className="i mt-4 flex flex-col gap-2">
                    <div>
                        <button onClick={onView} className="rounded-lg cursor-pointer bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700">
                            View Package Info
                        </button>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Created: {new Date(packageInfo.created_at).toLocaleDateString()}</span>
                        <span>Updated: {new Date(packageInfo.updated_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
