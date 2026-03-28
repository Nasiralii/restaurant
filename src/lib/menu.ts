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
        imageSrc:
          "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "cappuccino",
        name: "Cappuccino",
        description: "Espresso with silky milk foam, classic.",
        priceSar: 18,
        imageSrc:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "latte",
        name: "Latte",
        description: "Creamy steamed milk with espresso.",
        priceSar: 19,
        imageSrc:
          "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "americano",
        name: "Americano",
        description: "Espresso with hot water, smooth.",
        priceSar: 15,
        imageSrc:
          "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=800&q=80",
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
          "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80",
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
        // FIX: replaced broken source.unsplash.com URL
        imageSrc:
          "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
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
        // FIX: replaced broken source.unsplash.com URL
        imageSrc:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "cinnamonRoll",
        name: "Cinnamon Roll",
        description: "Sweet cinnamon swirl pastry.",
        priceSar: 18,
        // FIX: replaced broken source.unsplash.com URL
        imageSrc:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
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
        imageSrc:
          "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "lemonade",
        name: "Lemonade",
        description: "Fresh citrus drink, lightly sweet.",
        priceSar: 14,
        imageSrc:
          "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "smoothie",
        name: "Smoothie",
        description: "Blended fresh fruits.",
        priceSar: 20,
        imageSrc:
          "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "hotChocolate",
        name: "Hot Chocolate",
        description: "Warm cocoa with milk foam.",
        priceSar: 18,
        imageSrc:
          "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80",
      },
      {
        key: "freshJuice",
        name: "Fresh Juice",
        description: "Cold pressed seasonal juice.",
        priceSar: 17,
        imageSrc:
          "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

export const CATEGORY_LABELS: Record<MenuCategoryId, string> = {
  coffee: "Coffee",
  desserts: "Desserts",
  drinks: "Drinks",
};
