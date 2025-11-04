
import React, { useState } from 'react';
import MenuInput from './components/MenuInput';
import PhotoGallery from './components/PhotoGallery';
import type { Dish, DishWithImage, PhotoStyle } from './types';
import { parseMenu, generateFoodImage } from './services/geminiService';
import { DEFAULT_MENU } from './constants';
import { PhotoStyle as PhotoStyleEnum } from './types';

function App() {
  const [menuText, setMenuText] = useState<string>(DEFAULT_MENU);
  const [selectedStyle, setSelectedStyle] = useState<PhotoStyle>(PhotoStyleEnum.MODERN);
  const [dishes, setDishes] = useState<DishWithImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!menuText.trim()) return;

    setIsLoading(true);
    setError(null);
    setDishes([]);

    try {
      const parsedDishes: Dish[] = await parseMenu(menuText);
      
      const dishesToProcess: DishWithImage[] = parsedDishes.map(dish => ({
        ...dish,
        id: crypto.randomUUID(),
        isLoading: true,
      }));

      setDishes(dishesToProcess);
      
      for (const dish of dishesToProcess) {
        try {
            const imageUrl = await generateFoodImage(dish, selectedStyle);
            setDishes(prevDishes => 
                prevDishes.map(d => 
                    d.id === dish.id ? { ...d, imageUrl, isLoading: false } : d
                )
            );
        } catch (imageError) {
            console.error(`Failed to generate image for ${dish.name}`, imageError);
            // Set error state for this specific card but continue
            setDishes(prevDishes => 
                prevDishes.map(d => 
                    d.id === dish.id ? { ...d, isLoading: false } : d // No image, stop loading
                )
            );
        }
      }

    } catch (e) {
      const err = e as Error;
      console.error(err);
      setError(err.message || 'An unknown error occurred.');
      setDishes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                    Virtual Food Photographer
                </h1>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 sticky top-[80px]">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <MenuInput
                menuText={menuText}
                setMenuText={setMenuText}
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6" role="alert">
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <PhotoGallery dishes={dishes} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
