export type Language = "ar" | "en";

export interface Translation {
  [key: string]: string | Translation;
}

export const translations: Record<Language, Translation> = {
  ar: {
    nav: {
      coffee: "قهوة",
      desserts: "حلويات",
      drinks: "مشروبات",
      order: "اطلب الآن",
      qr: "QR",
      viewMenu: "عرض القائمة",
    },
    home: {
      brand: "بريو و بايت",
      tagline:
        "زاوية مريحة تقدم مشروبات إسبريسو مصنوعة يدوياً، حلويات مخبوزة طازجة، ومشروبات منعشة - طوال اليوم، كل يوم.",
      updatedToday: "محدث اليوم • 5-8 عناصر لكل قسم",
    },
    banner: {
      coffee: {
        eyebrow: "قهوة",
        title: "إسبريسو، مصنوع بعناية",
        description:
          "كريما ناعمة، نغمات دافئة، وقائمة تشعر بالراحة مثل المنزل.",
      },
      desserts: {
        eyebrow: "حلويات",
        title: "تركيبات حلوة لكل رشفة",
        description: "المخبوزات المفضلة الطازجة بنكهات غنية مريحة.",
      },
      drinks: {
        eyebrow: "مشروبات",
        title: "انتعاش منعش، طوال اليوم",
        description: "من الكلاسيكيات المثلجة إلى الشوكولاتة الساخنة المريحة.",
      },
      previous: "السابق",
      next: "التالي",
      goToSlide: "اذهب إلى الشريحة",
    },
    categories: {
      coffee: {
        title: "قهوة",
        subtitle: "مشروبات إسبريسو من دفعات صغيرة بنهاية سلسة.",
      },
      desserts: {
        title: "حلويات",
        subtitle: "حلويات مخبوزة طازجة يومياً.",
      },
      drinks: {
        title: "مشروبات",
        subtitle: "مشروبات منعشة لكل مزاج.",
      },
    },
    items: {
      espresso: {
        name: "إسبريسو",
        description: "جرعة غنية وجريئة برائحة الكراميل.",
      },
      cappuccino: {
        name: "كابتشينو",
        description: "إسبريسو مع حليب حريري رغوي، كلاسيكي.",
      },
      latte: {
        name: "لاتيه",
        description: "حليب مبخر كريمي مع إسبريسو.",
      },
      americano: {
        name: "أمريكانو",
        description: "إسبريسو مع ماء ساخن، سلس.",
      },
      mocha: {
        name: "موكا",
        description: "قهوة مع غنى الشوكولاتة.",
      },
      flatwhite: {
        name: "وايت أبيض",
        description: "قهوة رغوية دقيقة.",
      },
      croissant: {
        name: "كرواسان",
        description: "معجنات زبدية متفتتة، مخبوزة طازجة.",
      },
      cheesecake: {
        name: "جبن كيك",
        description: "حلوى كلاسيكية كريمية وناعمة.",
      },
      brownie: {
        name: "براوني",
        description: "براوني شوكولاتة غنية بالفودج.",
      },
      tiramisu: {
        name: "تيراميسو",
        description: "حلوى متعددة الطبقات بنكهة القهوة.",
      },
      cinnamonroll: {
        name: "لفيفة القرفة",
        description: "معجنات حلوة حلزونية بالقرفة.",
      },
      icedtea: {
        name: "شاي مثلج",
        description: "شاي منعش بارد التخمير.",
      },
      lemonade: {
        name: "ليمونادة",
        description: "مشروب حمضيات طازج، حلو خفيف.",
      },
      smoothie: {
        name: "سموثي",
        description: "فواكه طازجة مخلوطة.",
      },
      hotchocolate: {
        name: "شوكولاتة ساخنة",
        description: "كاكاو دافئ مع رغوة الحليب.",
      },
      freshjuice: {
        name: "عصير طازج",
        description: "عصير موسمي معصور على البارد.",
      },
    },
    qrModal: {
      title: "رمز QR",
      subtitle: "شارك أو امسح هذه الصفحة ضوئياً",
      close: "إغلاق",
      copyLink: "نسخ الرابط",
      copied: "تم النسخ",
      qrAlt: "رمز QR يربط بهذه الصفحة",
      scanInstructions:
        "استخدم كاميرا لمسح رمز QR ضوئياً. إذا كان يحتوي على URL، سنفتحه.",
      startCamera: "بدء الكاميرا",
      cameraTip:
        "نصيحة: على سطح المكتب، يعتمد المسح الضوئي على أذونات الكاميرا المتاحة.",
    },
    footer: {
      menu: "القائمة",
      hours: "ساعات العمل",
      contact: "تواصل",
      findUs: "اعثر علينا",
      openInMaps: "افتح في خرائط جوجل",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
      rights: "جميع الحقوق محفوظة.",
      phone: "+966 50 000 0000",
      address: "حي العليا، الرياض 12211، المملكة العربية السعودية",
      email: "hello@brewandbite.sa",
      hoursSatThu: "السبت – الخميس",
      hoursFri: "الجمعة",
      hoursTime1: "8:00 ص – 12:00 ص",
      hoursTime2: "2:00 م – 1:00 ص",
    },
  },
  en: {
    nav: {
      coffee: "Coffee",
      desserts: "Desserts",
      drinks: "Drinks",
      order: "Order",
      qr: "QR",
      viewMenu: "View Menu",
    },
    home: {
      brand: "Brew & Bite",
      tagline:
        "A cozy corner cafe serving handcrafted espresso drinks, freshly baked desserts, and refreshing beverages — all day, every day.",
      updatedToday: "Updated today • 5–8 items per section",
    },
    banner: {
      coffee: {
        eyebrow: "Coffee",
        title: "Espresso, crafted with care",
        description:
          "Smooth crema, warm tones, and a menu that feels like home.",
      },
      desserts: {
        eyebrow: "Desserts",
        title: "Sweet pairings for every sip",
        description: "Freshly baked favorites with rich, comforting flavors.",
      },
      drinks: {
        eyebrow: "Drinks",
        title: "Cool refreshment, all day",
        description: "From iced classics to cozy hot chocolate.",
      },
      previous: "Previous",
      next: "Next",
      goToSlide: "Go to slide",
    },
    categories: {
      coffee: {
        title: "Coffee",
        subtitle: "Small-batch espresso drinks with a smooth finish.",
      },
      desserts: {
        title: "Desserts",
        subtitle: "Freshly baked sweets made daily.",
      },
      drinks: {
        title: "Drinks",
        subtitle: "Refreshing beverages for every mood.",
      },
    },
    items: {
      espresso: {
        name: "Espresso",
        description: "Rich, bold shot with a caramel aroma.",
      },
      cappuccino: {
        name: "Cappuccino",
        description: "Espresso with silky milk foam, classic.",
      },
      latte: {
        name: "Latte",
        description: "Creamy steamed milk with espresso.",
      },
      americano: {
        name: "Americano",
        description: "Espresso with hot water, smooth.",
      },
      mocha: {
        name: "Mocha",
        description: "Coffee with chocolate richness.",
      },
      flatWhite: {
        name: "Flat White",
        description: "Smooth microfoam coffee.",
      },
      croissant: {
        name: "Croissant",
        description: "Buttery flaky pastry, freshly baked.",
      },
      cheesecake: {
        name: "Cheesecake",
        description: "Creamy and soft classic dessert.",
      },
      brownie: {
        name: "Brownie",
        description: "Rich chocolate fudge brownie.",
      },
      tiramisu: {
        name: "تيراميسو",
        description: "حلوى متعددة الطبقات بنكهة القهوة.",
      },
      cinnamonRoll: {
        name: "لفيفة القرفة",
        description: "معجنات حلوة حلزونية بالقرفة.",
      },
      icedTea: {
        name: "شاي مثلج",
        description: "شاي منعش بارد التخمير.",
      },
      lemonade: {
        name: "ليمونادة",
        description: "مشروب حمضيات طازج، حلو خفيف.",
      },
      smoothie: {
        name: "سموثي",
        description: "فواكه طازجة مخلوطة.",
      },
      hotChocolate: {
        name: "شوكولاتة ساخنة",
        description: "كاكاو دافئ مع رغوة الحليب.",
      },
      freshJuice: {
        name: "عصير طازج",
        description: "عصير موسمي معصور على البارد.",
      },
    },
    qrModal: {
      title: "QR code",
      subtitle: "Share or scan this page",
      close: "Close",
      copyLink: "Copy link",
      copied: "Copied",
      qrAlt: "QR code linking to this page",
      scanInstructions:
        "Use your camera to scan a QR code. If it contains a URL, we'll open it.",
      startCamera: "Start camera",
      cameraTip:
        "Tip: On desktop, scanning depends on available camera permissions.",
    },
    footer: {
      menu: "Menu",
      hours: "Hours",
      contact: "Contact",
      findUs: "Find Us",
      openInMaps: "Open in Google Maps",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      rights: "All rights reserved.",
      phone: "+966 50 000 0000",
      address: "Al Olaya District, Riyadh 12211, Saudi Arabia",
      email: "hello@brewandbite.sa",
      hoursSatThu: "Sat – Thu",
      hoursFri: "Friday",
      hoursTime1: "8:00 AM – 12:00 AM",
      hoursTime2: "2:00 PM – 1:00 AM",
    },
  },
};

export function getNestedValue(obj: Translation, path: string): string {
  const keys = path.split(".");
  let current: string | Translation = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key] as string | Translation;
    } else {
      // Return the original path if key not found, not the path itself
      return path;
    }
  }

  return typeof current === "string" ? current : path;
}
