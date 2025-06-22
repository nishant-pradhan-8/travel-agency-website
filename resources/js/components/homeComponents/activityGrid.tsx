import { activity } from "@/types/types"
export default function ActivityGrid({activities}:{activities:activity[]}){
    return(
        <div className="grid grid-cols-3  gap-4  grid-rows-2">
            {activities.map((act)=>(
                <div className={`bg-gray-400 flex flex-col justify-end gap-2 pb-8 items-center h-64 w-full rounded-3xl activity-div-${act.id}`} key={act.id}>
                          <h1 className=' font-[playfair] text-white text-3xl'>{act.name}</h1>
                </div>
            ))}
        </div>
    )
}