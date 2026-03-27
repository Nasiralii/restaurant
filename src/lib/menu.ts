export type MenuCategoryId = "coffee" | "desserts" | "drinks";

export type MenuItem = {
  key: string; // Add unique key for translation lookup
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
        imageSrc:
          "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "cappuccino",
        name: "Cappuccino",
        description: "Espresso with silky milk foam, classic.",
        priceSar: 18,
        imageSrc:
          "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "latte",
        name: "Latte",
        description: "Creamy steamed milk with espresso.",
        priceSar: 19,
        imageSrc:
          "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "americano",
        name: "Americano",
        description: "Espresso with hot water, smooth.",
        priceSar: 15,
        imageSrc:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "mocha",
        name: "Mocha",
        description: "Coffee with chocolate richness.",
        priceSar: 21,
        imageSrc:
          "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "flatWhite",
        name: "Flat White",
        description: "Smooth microfoam coffee.",
        priceSar: 20,
        imageSrc:
          "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
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
        imageSrc:
          "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "cheesecake",
        name: "Cheesecake",
        description: "Creamy and soft classic dessert.",
        priceSar: 22,
        imageSrc:
          "https://images.unsplash.com/photo-1509440159598-02455d5e789f?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "brownie",
        name: "Brownie",
        description: "Rich chocolate fudge brownie.",
        priceSar: 16,
        imageSrc:
          "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "tiramisu",
        name: "Tiramisu",
        description: "Coffee-flavored layered dessert.",
        priceSar: 24,
        imageSrc:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607b5?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "cinnamonRoll",
        name: "Cinnamon Roll",
        description: "Sweet cinnamon swirl pastry.",
        priceSar: 18,
        imageSrc:
          "https://images.unsplash.com/photo-1509365465985-0ab04a9f460e?auto=format&fit=crop&w=800&q=80",
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
        imageSrc:
          "https://images.unsplash.com/photo-1556679413-95069d85e841?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "lemonade",
        name: "Lemonade",
        description: "Fresh citrus drink, lightly sweet.",
        priceSar: 14,
        imageSrc:
          "https://images.unsplash.com/photo-1613478743109-8d6d4f8b0c1?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "smoothie",
        name: "Smoothie",
        description: "Blended fresh fruits.",
        priceSar: 20,
        imageSrc:
          "https://images.unsplash.com/photo-1613478743109-8d6d4f8b0c1?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "hotChocolate",
        name: "Hot Chocolate",
        description: "Warm cocoa with milk foam.",
        priceSar: 18,
        imageSrc:
          "https://images.unsplash.com/photo-1613478743109-8d6d4f8b0c1?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "freshJuice",
        name: "Fresh Juice",
        description: "Cold pressed seasonal juice.",
        priceSar: 17,
        imageSrc:
          "https://images.unsplash.com/photo-1613478743109-8d6d4f8b0c1?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

export const CATEGORY_LABELS: Record<MenuCategoryId, string> = {
  coffee: "Coffee",
  desserts: "Desserts",
  drinks: "Drinks",
};
