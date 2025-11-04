
import { PhotoStyle } from './types';
import { CameraIcon, GlobeAltIcon, SunIcon } from './components/icons';

export const PHOTO_STYLE_OPTIONS = [
  { id: PhotoStyle.MODERN, label: 'Bright & Modern', icon: SunIcon },
  { id: PhotoStyle.RUSTIC, label: 'Rustic & Dark', icon: CameraIcon },
  { id: PhotoStyle.SOCIAL, label: 'Social Media', icon: GlobeAltIcon },
];

export const DEFAULT_MENU = `Margherita Pizza
Classic pizza with fresh mozzarella, San Marzano tomatoes, fresh basil, salt and extra-virgin olive oil.

Spaghetti Carbonara
A classic Roman pasta dish made with egg, hard cheese, cured pork, and black pepper.

Tiramisu
A coffee-flavoured Italian dessert. It is made of ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar and mascarpone cheese, flavoured with cocoa.`;
