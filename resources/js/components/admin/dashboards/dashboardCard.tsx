import { Ticket } from "lucide-react";
import { DashboradCard } from "./mainDashboard";
export default function DashboardCard({details}:{details:DashboradCard}){

    return (

          <div className="flex flex-col items-start gap-4">
            <div className="bg-teal-400 p-2 rounded-full text-teal-800">
            {details.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{details.name}</p>
              <div className="flex flex-row items-center gap-2">

              <h2 className="text-2xl font-bold text-gray-900">{details.amount}</h2>
            
              </div>
            </div>
          </div>
   
      );
}

// 