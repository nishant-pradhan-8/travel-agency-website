import React from 'react';
import Tag from './tag';



const Trust = () => {
  return (
    <div   className="bg-yellow-100 py-16  "> {/* Adjusted background color to be close to the image, and added padding */}
   
      <div className="max-w-[1440px] mx-auto grid px-4 grid-cols-1 md:grid-cols-3 gap-8 ">
      
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
         <img src='/images/trusted.svg' className='w-12 h-12' />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Experienced and Trusted</h3> {/* Adjusted font weight and color */}
          <p className="text-gray-600 text-sm"> 
            We have been helping people travel Nepal for over 10 years and served over 5000+ client. You can trust us with your trip.
          </p>
        </div>

        
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
  
          <img src='/images/guide.svg' className='w-12 h-12' />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Expert Guides</h3>
          <p className="text-gray-600 text-sm">
           We have over 20+ guides who help our travellers explore Nepal inside out. You will be in good hands. 
          </p>
        </div>

        {/* Card 3: Over 2 million active trips (Settings/Sliders Icon) */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
      
          <img src='/images/safety.svg' className='w-12 h-12' />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Safe and Supported</h3>
          <p className="text-gray-600 text-sm">
            Your safety and comfort are our top priorities. We provide 24/7 on-ground support and adhere to the highest safety standards for your worry-free trip
          </p>
        </div>
      </div>
    </div>
  );
};

export default Trust;