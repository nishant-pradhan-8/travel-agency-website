import { PopularInfo } from "@/types/types";

import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export default function PopularCard({info, source}:{info:PopularInfo[], source:string}) {
  return (
    <div className="bg-white  items-center rounded-xl border-[1px] border-gray-300 p-6 w-full max-w-xs">
      <div className="mb-2 text-gray-900 font-semibold text-lg">Popular {source}</div>
      <div className="flex flex-col gap-4">
        {info.map((info) => (
          <div key={info.id} className="flex items-center gap-3">
            <div className={`w-10 bg-teal-700 h-10 rounded-full flex items-center justify-center`}>
           {source==="Destinations"?<BeachAccessIcon />:<img src='/images/activityIcon.svg' className='w-8 h-8 filter:brightness-0 invert-[1]' />} 
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{info.name}</div>
              <div className="text-xs text-gray-400">Liked by: <span className="font-bold">{info.count}</span> Travellers</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}