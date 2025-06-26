export default function CallToActionSection() {
  return (
    <section className="bg-gradient-to-br px-4 py-18 max-w-[1440px] mx-auto ">
      <div className="max-w-4xl mx-auto text-center  ">
        <h2 className="text-2xl font-[playfair] md:text-5xl  font-bold text-white mb-4 leading-tight">
          Ready to Travel and Enjoy?
        </h2>
        <p className="font-[playfair] text-2xl md:text-4xl text-white mb-12 font-light">
          Give us a quick call
        </p>
        
        <button className="bg-primary cursor-pointer hover:bg-[primary] text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-2">
          Contact us
        <img className="w-4 h-4" src="/images/right.svg" />
        </button>
      </div>
    </section>
  );
}