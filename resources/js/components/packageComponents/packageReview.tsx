import { useAppContext } from '@/contexts/appContext';
import { review } from '@/types/types';
import { register } from 'module';
import { FaStar } from 'react-icons/fa';
const PackageReview = ({ reviews }: { reviews: review[] }) => {
    function formatTimestamp(isoString: string) {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    }
  console.log(reviews, 'rev')
  const {APP_URL} = useAppContext();
    return (
        <div className="flex flex-col items-start gap-4">
            {reviews.map((rev) => (
                <div key={rev.id} className="mx-auto flex min-w-3xl gap-4 rounded-lg border bg-white p-6 shadow">
                    {/* Avatar */}
                    
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border">
                      {
                        rev.user.profile_picture?<img className='rounded-full' src={`${APP_URL}/storage/${rev.user.profile_picture}`} />:    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-10 w-10 text-gray-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                      }
                    
                    </div>

                    {/* Testimonial Content */}
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-gray-800">{rev.user.full_name}</h3>
                            <span className="text-sm text-gray-500">{formatTimestamp(rev.created_at)}</span>
                        </div>

                        {/* Stars */}
                        <div className="my-2 flex text-yellow-500">
                            {Array(Math.ceil(Number(rev.rating)))
                                .fill(1)
                                .map((_, idx) => (
                                    <FaStar key={idx} />
                                ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-sm text-gray-700">{rev.review} </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PackageReview;
