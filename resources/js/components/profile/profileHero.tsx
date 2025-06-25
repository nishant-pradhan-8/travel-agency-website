
import { info } from "@/types/types";
import Navbar from "../homeComponents/navbar";
export default function ProfileHero(){
    return(
          <section
                style={{ backgroundImage: `url("/images/destination.jpg")` }}
                className="hero-section  bg-cover bg-center relative bg-no-repeat p-4 pb-12"
            >
                <div className="absolute top-0 left-0 h-full w-full bg-[#0000009c]"></div>
                <header className="relative z-20 m-auto max-w-[1440px] ">
                    <Navbar />
                </header>
                <div className="relative z-20 m-auto my-18 flex  gap-2 max-w-[1440px] flex-col items-center justify-center">
                    <h1 className="text-center font-[playfair] text-4xl leading-tight font-extrabold text-white md:text-6xl">
                      Profile Info
                    </h1>
                    <p className="w-[60%] text-center"> See / Edit Your Profile Details</p>
                </div>      
            </section>
    )
}