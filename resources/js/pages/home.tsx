import ActivitySection from '@/components/homeComponents/activitySection';
import CallToActionSection from '@/components/homeComponents/cta';
import HeroSection from '@/components/homeComponents/hero';
import Navbar from '@/components/homeComponents/navbar';
import PopularDestinations from '@/components/homeComponents/popularDestinations';
import StepsSection from '@/components/homeComponents/stepsSection';
import Trust from '@/components/homeComponents/trust';
import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';
import { activity, destination } from '@/types/types';
import { Head, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
export default function Welcome({ destinations, activities }: { destinations: destination[]; activities: activity[] }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
            
            </Head>
            <section
                style={{ backgroundImage: `url("/images/heroimg.png")` }}
                className="hero-section relative bg-cover bg-center bg-no-repeat p-4 pb-12"
            >
                <div className="absolute top-0 left-0 h-full w-full bg-[#00000047]"></div>
                <header className="relative z-20 m-auto max-w-[1440px]">
                    <Navbar />
                </header>

                <div className="relative z-20 m-auto flex max-w-[1440px] flex-col gap-12">
                    <HeroSection />
                    <StepsSection />
                </div>
            </section>
            <main>
                <section className="benefit-section relative">
                    <Trust />
                </section>
                <section className="popular-destination mx-auto mt-12 max-w-[1440px] px-4 py-8">
                    <PopularDestinations />
                </section>
                <section className="activity-section mx-auto max-w-[1440px] px-4 py-8 pb-18">
                    <ActivitySection />
                </section>
                <section className="cta bg-[#141B34]">
                    <CallToActionSection />
                </section>
            </main>
        </>
    );
}
Welcome.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
