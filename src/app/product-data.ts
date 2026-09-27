export interface Product {
  readonly id: number;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly price: number;
  readonly image: string;
}

// Demo catalogue: prices are illustrative, not live retail offers.
export const PRODUCTS: readonly Product[] = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Work & study',
    description: 'A versatile companion for work, study and everyday ideas.',
    price: 900,
    image: 'assets/images/laptop.jpg',
  },
  {
    id: 2,
    name: 'Mouse',
    category: 'Desk essentials',
    description: 'A comfortable grip for everything on your to-do list.',
    price: 25,
    image: 'assets/images/mouse.jpg',
  },
  {
    id: 3,
    name: 'Keyboard',
    category: 'Desk essentials',
    description: 'Comfortable keys. A modern look. Make yourself at home.',
    price: 60,
    image: 'assets/images/keyboard.jpg',
  },
  {
    id: 4,
    name: 'Amazon Echo Plus',
    category: 'Home audio',
    description: 'Bring music and a little everyday convenience to your space with a smart speaker.',
    price: 99,
    image: 'assets/images/amazon-echo-plus.webp',
  },
  {
    id: 5,
    name: 'Apple AirPods',
    category: 'Personal audio',
    description: 'Wireless earbuds for your daily soundtrack, calls and moments on the move.',
    price: 129,
    image: 'assets/images/apple-airpods.webp',
  },
  {
    id: 6,
    name: 'Apple AirPods Max',
    category: 'Personal audio',
    description: 'Over-ear headphones in silver for settling into your favorite albums and podcasts.',
    price: 499,
    image: 'assets/images/apple-airpods-max-silver.webp',
  },
  {
    id: 7,
    name: 'Apple HomePod Mini',
    category: 'Home audio',
    description: 'A compact smart speaker in cosmic grey that fits neatly into your everyday space.',
    price: 109,
    image: 'assets/images/apple-homepod-mini-cosmic-grey.webp',
  },
  {
    id: 8,
    name: 'Apple MagSafe Battery Pack',
    category: 'Power & charging',
    description: 'A compact battery pack for a little extra power on compatible MagSafe iPhones.',
    price: 89,
    image: 'assets/images/apple-magsafe-battery-pack.webp',
  },
  {
    id: 9,
    name: 'Beats Flex',
    category: 'Personal audio',
    description: 'Wireless earphones with a flexible neckband for music throughout your day.',
    price: 69,
    image: 'assets/images/beats-flex-wireless-earphones.webp',
  },
];
