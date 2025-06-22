
export default function CopyrightFooter() {
  return (

      <div className=" flex justify-between items-center  py-6 px-4 border-t border-gray-200  max-w-[1440px] mx-auto">
        <div className="text-sm text-gray-600">
          copyright@ prydetravel 2023
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
      
            aria-label="Instagram"
          >
            <img src="/images/instagram.svg" className="w-6 h-6 " />
          </a>
          
          <a 
            href="#" 
           
            aria-label="LinkedIn"
          >
         
            <img src="/images/linkedin.svg" className="w-6 h-6 " />
          </a>
          
          <a 
            href="#" 
           
            aria-label="Facebook"
          >
          
            <img src="/images/facebook.svg" className="w-6 h-6 " />
          </a>
        </div>
      </div>

  );
}