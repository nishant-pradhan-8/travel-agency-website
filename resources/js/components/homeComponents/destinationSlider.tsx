// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { destination } from '@/types/types';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

export default function DestinationSlider({ destinations }: { destinations:destination[]}) {
    return (
        <>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={20}
              
                navigation={true}
                modules={[ Navigation]}
                className="mySwiper relative bg-transparent"
            >
                 {
                        destinations.map((dest)=>(
                <SwiperSlide  key={dest.id}
                    style={{ backgroundImage: `url("https://via.placeholder.com/640x480.png/0077ee?text=repellat")` }}
                    className="h-full max-w-[280px] rounded-2xl bg-gray-400 bg-cover bg-center bg-no-repeat"
                >
                   
      <div  className='flex flex-col h-full justify-end gap-2 pb-8 items-center'>
                        <h1 className=' font-[playfair] text-white text-3xl'>{dest.name}</h1>
                        <div className='flex flex-row items-center gap-2'>
                            <div
                                style={{ backgroundImage: `url("/images/nepal.png")` }}
                                className="h-8 w-8 rounded-full border-[0.5px] border-white bg-contain bg-center bg-no-repeat"
                            ></div>
                            <h2 className='text-white'>Nepal</h2>
                        </div>
                    </div>
                       
              
                </SwiperSlide>
               ))
                    }
            </Swiper>
        </>
    );
}
