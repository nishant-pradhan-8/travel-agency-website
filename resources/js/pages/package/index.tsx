import CallToActionSection from "@/components/homeComponents/cta";
import PackageHero from "@/components/packageComponents/packageHero";
import PackagesList from "@/components/packagesList";
import AppLayout from "@/layouts/app-layout";
import { Package } from "@/types/types";
import { ReactNode } from "react";

export default function Packages({packages}:{packages:Package[]}){
    return(
           <>
                    <PackageHero  />
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


Packages.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
