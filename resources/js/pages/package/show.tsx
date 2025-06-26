import Navbar from "@/components/homeComponents/navbar";
import PagesHero from "@/components/pages-hero";
import PakcageInfoSection from "@/components/packageComponents/packageInfoSection";
import { Departure,Package, review } from "@/types/types";
import GroupDiscountTable from "@/components/packageComponents/groupDiscountTable";
export interface additionalInfo {
      destinationName: string,
      activityName: string,
}
export default function({additionalInfo,packageInfo, reviews, departures}:{additionalInfo:additionalInfo,packageInfo:Package, reviews:review[], departures:Departure[]}){
  
    return(
        <>
         <div
               
                className="hero-section bg-gray-400  bg-cover bg-center relative bg-no-repeat p-4 pb-12"
            >
               {/* <div className="absolute top-0 left-0 h-full w-full bg-[#0000009c]"></div> */}
                <div className="relative z-20 m-auto max-w-[1440px] ">
                    <Navbar />
                </div>
                <div className="relative z-20 m-auto my-18 flex  gap-2 max-w-[1440px] flex-col items-center justify-center">
                    <h1 className="text-center font-[playfair] text-4xl leading-tight font-extrabold text-white md:text-6xl">
                        {packageInfo.name}
                    </h1>
                    <p className="w-[60%] text-center"></p>
                    <p className="font-bold text-[1rem]">{additionalInfo.destinationName} <span className="text-primary" >|</span> {additionalInfo.activityName} <span className="text-primary" > | </span> {packageInfo.duration}</p>
                </div>      
            </div>
      
        <PakcageInfoSection departures={departures}  additionalInfo={additionalInfo} packageInfo={packageInfo} reviews={reviews} />
        </>
    )
}