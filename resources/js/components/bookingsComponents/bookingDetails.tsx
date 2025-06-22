import { useAppContext } from "@/contexts/appContext";
import { Package, FormData } from "@/types/types";
import { useEffect, useState } from "react";

export default function BookingDetails({packageInfo}:{packageInfo:Package}){
   const { form } = useAppContext();
  const { data, setData, post, processing, errors } = form;
  const [groupDiscount, setGroupDiscount] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(Number(packageInfo.price));

  // Calculate group discount based on number of people
  function calcGroupDiscount(people: number): number {
    if (people <= 1) return 0;
    if (people === 2) return 20;
    if (people >= 3 && people <= 5) return 30;
    if (people >= 6 && people <= 9) return 60;
    if (people >= 10 && people <= 15) return 80;
    if (people > 15) return 100;
    return 0;
  }

  function calcTotalCost(): void {

    const noOfPeople = data.noOfPeople;
    if(noOfPeople===0){
      return
    }
    const basePrice = Number(packageInfo.price);
    const baseDiscount = Number(packageInfo.discount);
    const groupDiscountAmount = calcGroupDiscount(data.noOfPeople);

    setGroupDiscount(groupDiscountAmount);

    const total = (basePrice * data.noOfPeople) - (baseDiscount + groupDiscountAmount);
    setTotalCost(Math.round(total));
 
  }

  useEffect(() => {
    calcTotalCost();
  }, [data.noOfPeople, packageInfo]);

  useEffect(()=>{
    setData('totalPrice',totalCost);
    console.log(totalCost);
  },[totalCost]);

      return (
        <div className="mt-10">
 <div className="">
      <div className="bg-white p-6 border-[1px] border-gray-200 rounded-lg  w-full max-w-lg">
        <h2 className="text-2xl font-[playfair] font-semibold text-teal-600 mb-6">
          Pricing Info
        </h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-gray-800">
          {/* Default Package Cost */}
          <div className="font-medium">Default Package Cost</div>
          <div className="text-right">${packageInfo.price}</div>
          <div className="col-span-2 border-b border-gray-200 my-1"></div> {/* Divider */}
 <div className="font-medium">Package Discount</div>
          <div className="text-right">${packageInfo.discount}</div>
          <div className="col-span-2 border-b border-gray-200 my-1"></div> 
          <div className="font-medium">Group Discount</div>
          <div className="text-right">${groupDiscount}</div>
          <div className="col-span-2 border-b border-gray-200 my-1"></div> 
          {/* Package Selected */}
          <div className="font-medium">Total Cost</div>
      
           <span className="text-right">${totalCost}</span>
          <div className="col-span-2 border-b border-gray-200 my-1"></div> {/* Divider */}

          {/* Other Fees */}
          <div className="font-medium">Other Fees</div>
          <div className="text-right">Free</div>
          <div className="col-span-2 border-b border-gray-200 my-1"></div> {/* Divider */}

          {/* Booking Fees */}
          <div className="font-medium">Booking Fees</div>
          <div className="text-right">Free</div>
          <div className="col-span-2 border-b border-gray-200 my-1"></div> {/* Divider */}

       
        </div>

        {/* Total Amount Footer */}
        <div className="mt-6 bg-teal-800 text-white flex justify-between items-center p-4 rounded-lg">
          <div className="text-xl font-bold uppercase">total amount</div>
          <div className="text-xl font-extrabold">${totalCost}</div>
        </div>
      </div>
    
    </div>
        </div>
   
    )
}