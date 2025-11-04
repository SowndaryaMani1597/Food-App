
import React from 'react';
import type { DishWithImage } from '../types';
import DishCard from './DishCard';

interface PhotoGalleryProps {
  dishes: DishWithImage[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ dishes }) => {
  if (dishes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8 border-2 border-dashed border-gray-700 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-400">Your gallery is empty</h2>
        <p className="mt-2">Paste your menu and select a style to generate stunning food photos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
};

export default PhotoGallery;
