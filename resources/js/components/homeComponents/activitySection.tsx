import ActivityGrid from "./activityGrid"
import { activity } from "@/types/types"
import { MyPageProps } from "@/types/types";
import { usePage } from "@inertiajs/react";
export default function ActivitySection(){
       const {activities} = usePage<Partial<MyPageProps>>().props
    return(
        <div>
 <div className="">
      <p className="mb-2 text-lg text-gray-700 font-bold">What You Can Do</p>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-4xl font-bold text-teal-800">Popular Activities</h2>
        </div>
        </div>
       { activities && <ActivityGrid activities={activities} />}
        </div>
       
    )
}