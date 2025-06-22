import Navbar from "./homeComponents/navbar";
import { info } from "@/types/types";
export default function PagesHero({info, source}:{ info:info, source:string}){
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
                        Showing Results For <span className="text-primary"> {`${info['name']}`}</span>
                    </h1>
                    <p className="w-[60%] text-center">{info['description']}</p>
                    <p className="font-bold text-[1rem]">{source} <span className="text-primary" >/</span> {info.name}<span className="text-primary" > / </span> Packages</p>
                </div>      
            </section>
    )
}