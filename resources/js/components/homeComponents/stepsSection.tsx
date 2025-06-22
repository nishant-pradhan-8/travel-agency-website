
const steps = [
  { id: '01', title: 'Chose a place, activity and time', desc:"Choose your desired destination, activity and time and let us handle rest." },
  { id: '02', title: 'Get Ready For the Trip', desc:"Pack Your Bags and Get Ready For the Trip" },
  { id: '03', title: 'Enjoy the Trip', desc:"Enjoy you time by spending the time in Nepal" },
];

const StepsSection = () => {
  return (
    <section className=" text-white border-t border-white px-6 py-10 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {steps.map((step) => (
          <div key={step.id}>
            <p className="text-lg font-bold mb-1">{step.id}</p>
            <p className="font-semibold">{step.title}</p>
            <p className="text-gray-100 mt-1">
             {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepsSection;
