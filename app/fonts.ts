import { Inter, Montserrat } from 'next/font/google';

// Define Inter font (replacing Open Sauce)
export const openSauce = Inter({
  subsets: ['latin'],
  variable: '--font-opensauce',
});

// Define Montserrat font
export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});