import { additionalInfo } from '@/pages/package/show';
import { Package, review, Departure } from '@/types/types';
import DepartureTable from './packageDepartureTable';
import GroupDiscountTable from './groupDiscountTable';
import PackageReview from './packageReview';
import BookingCard from './bookingCard';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { ReactNode } from 'react';
import RowingIcon from '@mui/icons-material/Rowing';

import BeachAccessIcon from '@mui/icons-material/BeachAccess';
interface tripSummary{
        name: string,
        info: string,
        image: ReactNode,
}
export default function PakcageInfoSection({
    additionalInfo,
    packageInfo,
    reviews,
    departures
}: {
    additionalInfo: additionalInfo;
    packageInfo: Package;
    reviews: review[];
    departures: Departure[]
}) {
    const tripSummary:tripSummary[] = [
        {
            name: 'Duration',
            info: packageInfo.duration,
            image: <TimelapseIcon className='!w-8 !h-8' />,
        },
        {
            name: 'Activity',
            info: additionalInfo.activityName,
            image: <RowingIcon className='!w-8 !h-8' /> ,
        },
        {
            name: 'Destination',
            info: additionalInfo.destinationName,
            image: <BeachAccessIcon className='!w-8 !h-8' />,
        },
    ];
    return (
        <div className="grid grid-cols-[2fr_1fr] gap-4  text-black max-w-[1280px] m-auto p-4">
            <div className='flex flex-col gap-8 items-start'>
                <div>
 <h1 className="font-[playfair] text-4xl text-teal-800 mb-4 ">Trip Summary</h1>
                <div className="flex flex-row flex-wrap items-center gap-4">
                    {tripSummary.map((sum,i) => (
                        <div key={i} className="flex flex-row items-center gap-2">
                            {sum.image}
                            <div className="text-[0.8rem] font-bold">
                                {sum.name} <br />
                                <span className="font-semibold text-teal-800">{sum.info}</span>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
               
                <div>
                          <h1 className="font-[playfair] text-4xl text-teal-800 mb-4">Trip Description</h1>
                          <p>
                            {packageInfo.description}
                          </p>
                </div>
                  <div>
                          <h1 className="font-[playfair] text-4xl text-teal-800 mb-4">Group Discounts</h1>
                                          <GroupDiscountTable packageInfo={packageInfo} />
                </div>
              
                 <div>
                          <h1 className="font-[playfair] text-4xl text-teal-800 mb-4">UpComming Fixed Departures</h1>
                                        <DepartureTable packageInfo={packageInfo}     departures={departures} />
                </div>
                  <div>
                          <h1 className="font-[playfair] text-4xl text-teal-800 mb-4">Package Reviews</h1>
                          <PackageReview reviews={reviews} />
                </div>
            </div>
            <div className='relative'>
   <BookingCard  packageInfo={packageInfo}/>
            </div>
         
        </div>
    );
}
