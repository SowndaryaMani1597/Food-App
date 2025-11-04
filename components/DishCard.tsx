
import React from 'react';
import type { DishWithImage } from '../types';

interface DishCardProps {
  dish: DishWithImage;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="aspect-[4/3] w-full bg-gray-700">
        {dish.isLoading && (
          <div className="w-full h-full bg-gray-700 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] animate-shimmer flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {dish.imageUrl && !dish.isLoading && (
          <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-white">{dish.name}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{dish.description}</p>
      </div>
    </div>
  );
};

export default DishCard;
