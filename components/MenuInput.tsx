
import React from 'react';
import { PhotoStyle } from '../types';
import { PHOTO_STYLE_OPTIONS } from '../constants';
import { SparklesIcon } from './icons';

interface MenuInputProps {
  menuText: string;
  setMenuText: (text: string) => void;
  selectedStyle: PhotoStyle;
  setSelectedStyle: (style: PhotoStyle) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const MenuInput: React.FC<MenuInputProps> = ({
  menuText,
  setMenuText,
  selectedStyle,
  setSelectedStyle,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <label htmlFor="menu-input" className="block text-sm font-medium text-gray-300 mb-2">
          Paste Your Menu
        </label>
        <textarea
          id="menu-input"
          rows={12}
          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-200"
          placeholder="e.g., Margherita Pizza\nClassic pizza with fresh mozzarella..."
          value={menuText}
          onChange={(e) => setMenuText(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-2">Choose a Style</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PHOTO_STYLE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedStyle(option.id)}
              disabled={isLoading}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedStyle === option.id
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-500 text-gray-300'
              }`}
            >
              <option.icon className="w-7 h-7 mb-2" />
              <span className="text-sm font-semibold">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={onGenerate}
        disabled={isLoading || !menuText.trim()}
        className="w-full flex items-center justify-center py-4 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors duration-300"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2"/>
            Generate Photos
          </>
        )}
      </button>
    </div>
  );
};

export default MenuInput;
