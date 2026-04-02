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
      flatWhite: {
        name: "وايت فلات",
        description: "قهوة رغوية دقيقة.",
      },
      croissant: {
        name: "كرواسان",
        description: "معجنات زبدية متفتتة، مخبوزة طازجة.",
      },
      cheesecake: {
        name: "تشيز كيك",
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
    cart: {
      shoppingCart: "سلة التسوق",
      addToCart: "أضف للسلة",
      inCart: "في السلة",
      viewCart: "عرض السلة",
      cartEmpty: "السلة فارغة",
      cartEmptyMessage: "أضف بعض العناصر اللذيذة من القائمة",
      browseMenu: "تصفح القائمة",
      items: "عنصر",
      subtotal: "المجموع الفرعي",
      vat: "ضريبة القيمة المضافة",
      total: "الإجمالي",
      checkout: "إتمام الطلب",
      continueBrowsing: "تابع التصفح",
    },
    checkout: {
      title: "إتمام الطلب",
      orderSummary: "ملخص الطلب",
      customerName: "اسم العميل",
      namePlaceholder: "أدخل اسمك",
      phone: "رقم الهاتف",
      phonePlaceholder: "+966 5xxxxxxxx",
      orderType: "نوع الطلب",
      delivery: "توصيل",
      pickup: "استلام",
      deliveryAddress: "عنوان التوصيل",
      addressPlaceholder: "أدخل عنوان التوصيل",
      paymentMethod: "طريقة الدفع",
      cashOnDelivery: "الدفع عند الاستلام",
      creditCard: "بطاقة ائتمانية",
      specialInstructions: "ملاحظات إضافية",
      specialInstructionsPlaceholder: "أي ملاحظات خاصة بالطلب",
      confirmOrder: "تأكيد الطلب",
    },
    orderConfirmation: {
      title: "تم تأكيد طلبك!",
      orderNumber: "رقم الطلب",
      estimatedDeliveryTime: "الوقت المتوقع للتوصيل",
      deliveryTime: "30-45 دقيقة",
      trackOrder: "تتبع الطلب",
      backToMenu: "العودة للقائمة",
    },
    validation: {
      phoneRequired: "رقم الهاتف مطلوب",
      invalidSaudiPhone: "يرجى إدخال رقم هاتف سعودي صحيح",
    },
    admin: {
      dashboard: "لوحة التحكم",
      products: "المنتجات",
      orders: "الطلبات",
      analytics: "الإحصائيات",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      adminPanel: "لوحة الإدارة",
      addProduct: "إضافة منتج جديد",
      editProduct: "تعديل المنتج",
      saveProduct: "حفظ المنتج",
      updateProduct: "تحديث المنتج",
      cancel: "إلغاء",
      back: "العودة",
      delete: "حذف",
      edit: "تعديل",
      search: "بحث",
      filter: "فلتر",
      available: "متاح",
      unavailable: "غير متاح",
      all: "الكل",
      categories: "الفئات",
      price: "السعر",
      nameAr: "الاسم بالعربية",
      nameEn: "الاسم بالإنجليزية",
      descriptionAr: "الوصف بالعربية",
      descriptionEn: "الوصف بالإنجليزية",
      image: "صورة المنتج",
      uploadImage: "رفع صورة",
      imageUrl: "رابط الصورة",
      dragDrop: "أو اسحب وأفلت الصورة هنا",
      sortOrder: "الترتيب",
      status: "الحالة",
      actions: "الإجراءات",
      noProducts: "لا توجد منتجات",
      loading: "جاري التحميل...",
      orderNumber: "رقم الطلب",
      customer: "العميل",
      total: "المجموع",
      date: "التاريخ",
      orderStatus: "حالة الطلب",
      viewDetails: "عرض التفاصيل",
      revenue: "الإيرادات",
      today: "اليوم",
      yesterday: "أمس",
      last7Days: "آخر 7 أيام",
      last30Days: "آخر 30 يوم",
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
        name: "Tiramisu",
        description: "Coffee-flavored layered dessert.",
      },
      cinnamonRoll: {
        name: "Cinnamon Roll",
        description: "Sweet cinnamon swirl pastry.",
      },
      icedTea: {
        name: "Iced Tea",
        description: "Cold brewed refreshing tea.",
      },
      lemonade: {
        name: "Lemonade",
        description: "Fresh citrus drink, lightly sweet.",
      },
      smoothie: {
        name: "Smoothie",
        description: "Blended fresh fruits.",
      },
      hotChocolate: {
        name: "Hot Chocolate",
        description: "Warm cocoa with milk foam.",
      },
      freshJuice: {
        name: "Fresh Juice",
        description: "Cold pressed seasonal juice.",
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
    cart: {
      shoppingCart: "Shopping Cart",
      addToCart: "Add to Cart",
      inCart: "In Cart",
      viewCart: "View Cart",
      cartEmpty: "Cart is Empty",
      cartEmptyMessage: "Add some delicious items from the menu",
      browseMenu: "Browse Menu",
      items: "items",
      subtotal: "Subtotal",
      vat: "VAT",
      total: "Total",
      checkout: "Checkout",
      continueBrowsing: "Continue Browsing",
    },
    checkout: {
      title: "Checkout",
      orderSummary: "Order Summary",
      customerName: "Customer Name",
      namePlaceholder: "Enter your name",
      phone: "Phone Number",
      phonePlaceholder: "+966 5xxxxxxxx",
      orderType: "Order Type",
      delivery: "Delivery",
      pickup: "Pickup",
      deliveryAddress: "Delivery Address",
      addressPlaceholder: "Enter delivery address",
      paymentMethod: "Payment Method",
      cashOnDelivery: "Cash on Delivery",
      creditCard: "Credit Card",
      specialInstructions: "Special Instructions",
      specialInstructionsPlaceholder: "Any special notes for your order",
      confirmOrder: "Confirm Order",
    },
    orderConfirmation: {
      title: "Order Confirmed!",
      orderNumber: "Order Number",
      estimatedDeliveryTime: "Estimated Delivery Time",
      deliveryTime: "30-45 minutes",
      trackOrder: "Track Order",
      backToMenu: "Back to Menu",
    },
    validation: {
      phoneRequired: "Phone number is required",
      invalidSaudiPhone: "Please enter a valid Saudi phone number",
    },
    admin: {
      dashboard: "Dashboard",
      products: "Products",
      orders: "Orders",
      analytics: "Analytics",
      settings: "Settings",
      logout: "Logout",
      adminPanel: "Admin Panel",
      addProduct: "Add New Product",
      editProduct: "Edit Product",
      saveProduct: "Save Product",
      updateProduct: "Update Product",
      cancel: "Cancel",
      back: "Back",
      delete: "Delete",
      edit: "Edit",
      search: "Search",
      filter: "Filter",
      available: "Available",
      unavailable: "Unavailable",
      all: "All",
      categories: "Categories",
      price: "Price",
      nameAr: "Name (Arabic)",
      nameEn: "Name (English)",
      descriptionAr: "Description (Arabic)",
      descriptionEn: "Description (English)",
      image: "Product Image",
      uploadImage: "Upload Image",
      imageUrl: "Image URL",
      dragDrop: "Or drag and drop image here",
      sortOrder: "Sort Order",
      status: "Status",
      actions: "Actions",
      noProducts: "No products found",
      loading: "Loading...",
      orderNumber: "Order Number",
      customer: "Customer",
      total: "Total",
      date: "Date",
      orderStatus: "Order Status",
      viewDetails: "View Details",
      revenue: "Revenue",
      today: "Today",
      yesterday: "Yesterday",
      last7Days: "Last 7 Days",
      last30Days: "Last 30 Days",
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
      return path;
    }
  }

  return typeof current === "string" ? current : path;
}
