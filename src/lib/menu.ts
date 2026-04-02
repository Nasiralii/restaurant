export type MenuCategoryId = "coffee" | "desserts" | "drinks";

export type MenuItem = {
  key: string;
  name: string;
  description: string;
  priceSar: number;
  imageSrc: string;
};

export type MenuCategory = {
  id: MenuCategoryId;
  title: string;
  subtitle: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "coffee",
    title: "Coffee",
    subtitle: "Small-batch espresso drinks with a smooth finish.",
    items: [
      {
        key: "espresso",
        name: "Espresso",
        description: "Rich, bold shot with a caramel aroma.",
        priceSar: 12,
        imageSrc: "",
      },
      {
        key: "cappuccino",
        name: "Cappuccino",
        description: "Espresso with silky milk foam, classic.",
        priceSar: 18,
        imageSrc: "",
      },
      {
        key: "latte",
        name: "Latte",
        description: "Creamy steamed milk with espresso.",
        priceSar: 19,
        imageSrc: "",
      },
      {
        key: "americano",
        name: "Americano",
        description: "Espresso with hot water, smooth.",
        priceSar: 15,
        imageSrc: "",
      },
      {
        key: "mocha",
        name: "Mocha",
        description: "Coffee with chocolate richness.",
        priceSar: 21,
        imageSrc: "",
      },
      {
        key: "flatWhite",
        name: "Flat White",
        description: "Smooth microfoam coffee.",
        priceSar: 20,
        imageSrc: "",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "Freshly baked sweets made daily.",
    items: [
      {
        key: "croissant",
        name: "Croissant",
        description: "Buttery flaky pastry, freshly baked.",
        priceSar: 14,
        imageSrc: "",
      },
      {
        key: "cheesecake",
        name: "Cheesecake",
        description: "Creamy and soft classic dessert.",
        priceSar: 22,
        // FIX: replaced broken source.unsplash.com URL
        imageSrc: "",
      },
      {
        key: "brownie",
        name: "Brownie",
        description: "Rich chocolate fudge brownie.",
        priceSar: 16,
        imageSrc: "",
      },
      {
        key: "tiramisu",
        name: "Tiramisu",
        description: "Coffee-flavored layered dessert.",
        priceSar: 24,
        // FIX: replaced broken source.unsplash.com URL
        imageSrc: "",
      },
      {
        key: "cinnamonRoll",
        name: "Cinnamon Roll",
        description: "Sweet cinnamon swirl pastry.",
        priceSar: 18,
        // FIX: replaced broken source.unsplash.com URL
        imageSrc: "",
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    subtitle: "Refreshing beverages for every mood.",
    items: [
      {
        key: "icedTea",
        name: "Iced Tea",
        description: "Cold brewed refreshing tea.",
        priceSar: 13,
        // FIX: replaced broken source.unsplash.com URL
        imageSrc: "",
      },
      {
        key: "lemonade",
        name: "Lemonade",
        description: "Fresh citrus drink, lightly sweet.",
        priceSar: 14,
        imageSrc: "",
      },
      {
        key: "smoothie",
        name: "Smoothie",
        description: "Blended fresh fruits.",
        priceSar: 20,
        imageSrc: "",
      },
      {
        key: "hotChocolate",
        name: "Hot Chocolate",
        description: "Warm cocoa with milk foam.",
        priceSar: 18,
        imageSrc: "",
      },
      {
        key: "freshJuice",
        name: "Fresh Juice",
        description: "Cold pressed seasonal juice.",
        priceSar: 17,
        imageSrc: "",
      },
    ],
  },
];

export const CATEGORY_LABELS: Record<MenuCategoryId, string> = {
  coffee: "Coffee",
  desserts: "Desserts",
  drinks: "Drinks",
};
