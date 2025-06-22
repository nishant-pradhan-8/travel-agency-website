import React from "react";
import { FaStar } from "react-icons/fa";
import { review } from "@/types/types";
const PackageReview = ({reviews}:{reviews:review[]}) => {
    function formatTimestamp(isoString:string) {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

  return (
    <div className="flex flex-col gap-4 items-start">
    {reviews.map((rev)=>(
 <div key={rev.id} className="flex gap-4  bg-white p-6 rounded-lg shadow border min-w-3xl mx-auto">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full border flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-10 h-10 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>

      {/* Testimonial Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">
            {rev.user.full_name}
          </h3>
          <span className="text-sm text-gray-500">{formatTimestamp(rev.created_at)}</span>
        </div>

    

        {/* Stars */}
        <div className="flex text-yellow-500 my-2">
          {Array(Math.ceil(Number(rev.rating)))
            .fill(1)
            .map((_, idx) => (
              <FaStar  key={idx} />
            ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-700 text-sm">
         {rev.review} </p>
      </div>
    </div>
    ))}
    </div>
   
  );
};

export default PackageReview;
