
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  totalStars = 5
}) => {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          className={`w-8 h-8 cursor-pointer ${
            index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => onRatingChange(index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
