import AppLayout from "@/layouts/app-layout";
import { ReactNode } from "react";
import { Package, info} from "@/types/types";
import PagesHero from "@/components/pages-hero";
import PackagesList from "@/components/packagesList";
import CallToActionSection from "@/components/homeComponents/cta";
export default function Activity({activityInfo, packages}:{activityInfo:info,packages:Package[]}){

    return(
        <>
          <PagesHero info={activityInfo} source="Activities" />
           <section className="m-auto max-w-[1440px] px-4 mb-18">
                <h2 className="mt-8 stroke-1 text-center font-[playfair] text-4xl font-bold text-teal-800">Best And Affordable Packages</h2>
                <div>
                    <PackagesList packages={packages} />
                </div>
            </section>
               <section className="cta bg-[#141B34]">
                                <CallToActionSection />
                            </section>
        </>
      
    )
}
Activity.layout = (page:ReactNode)=><AppLayout>{page}</AppLayout>