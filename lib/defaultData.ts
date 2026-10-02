import { SiteData } from "./types";

export const defaultSiteData: SiteData = {
  stall: {
    name: "MUMBAI SPICE",
    edition: "Navratri Edition",
    tagline: "9 Din 9 Swaad • Navratri Special Vadapav Fest",
    datesText: "20 - 28 September",
    timingsText: "6:00 PM to 12:00 AM",
    announcement: "🔥 Garba Specials Live! Garam Garam Cheese Burst Vadapav & Festive Combos Available Tonight!",
    heroImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    phone: "+91 98765 43210",
    whatsappNumber: "919876543210",
    locationAddress: "Stall #7, Navratri Garba Ground, SV Road, Borivali West, Mumbai",
    googleMapsUrl: "https://maps.google.com/?q=Borivali+West+Mumbai",
    instagramUrl: "https://instagram.com/mumbai_spice_vadapav",
    googleReviewUrl: "https://g.page/r/mumbai-spice-review",
    story: "Fresh banta hai, garam milta hai! Authentic Mumbai street taste curated specially for Navratri food lovers. Every vadapav is freshly fried in pure oil, loaded with spicy green thecha, garlic chutney, and molten cheese."
  },
  combos: [
    {
      id: "combo-1",
      name: "Double Burst Combo",
      price: 120,
      items: ["1 Cheese Burst Vadapav", "1 Mayo Vadapav", "1 Diet Coke"],
      savingsText: "Save ₹20",
      tag: "BEST SELLER",
      category: "CHEEZY DELIGHTS",
      order: 1,
      visible: true
    },
    {
      id: "combo-2",
      name: "Burst Maja Combo",
      price: 100,
      items: ["1 Cheese Burst Vadapav", "1 Maja (Mango Drink)", "1 Packaged Water"],
      savingsText: "Save ₹15",
      tag: "Sabse Zyada Pasand",
      category: "CHEEZY DELIGHTS",
      order: 2,
      visible: true
    },
    {
      id: "combo-3",
      name: "Burst Starter",
      price: 80,
      items: ["1 Cheese Burst Vadapav", "1 Thums Up / Sprite"],
      savingsText: "Save ₹10",
      tag: "Quick Snack",
      category: "CHEEZY DELIGHTS",
      order: 3,
      visible: true
    },
    {
      id: "combo-4",
      name: "Friends Pack",
      price: 150,
      items: ["2 Mumbai Style Vadapav", "2 Cheese Vadapav", "2 Thums Up", "1 Packaged Water"],
      savingsText: "Save ₹30",
      tag: "GROUP HIT",
      category: "SAVER PACKS",
      order: 4,
      visible: true
    },
    {
      id: "combo-5",
      name: "Classic Starter",
      price: 60,
      items: ["1 Mumbai Style Vadapav", "1 Maja (Mango Drink)", "1 Packaged Water"],
      savingsText: "Save ₹10",
      category: "SAVER PACKS",
      order: 5,
      visible: true
    },
    {
      id: "combo-6",
      name: "Chhota Pack",
      price: 50,
      items: ["1 Cheese Vadapav", "1 Thums Up"],
      savingsText: "Save ₹5",
      category: "SAVER PACKS",
      order: 6,
      visible: true
    }
  ],
  menuItems: [
    {
      id: "menu-1",
      name: "Mumbai Style Vadapav",
      alacartePrice: 25,
      inComboPrice: 20,
      category: "vadapav",
      description: "Crispy batata vada with sukha lehsun chutney, teekha thecha & sweet imli.",
      isVeg: true,
      order: 1,
      visible: true
    },
    {
      id: "menu-2",
      name: "Cheese Vadapav",
      alacartePrice: 35,
      inComboPrice: 30,
      category: "vadapav",
      description: "Topped with a generous layer of grated Amul cheese over steaming vada.",
      isVeg: true,
      order: 2,
      visible: true
    },
    {
      id: "menu-3",
      name: "Mayo Vadapav",
      alacartePrice: 30,
      inComboPrice: 30,
      category: "vadapav",
      description: "Creamy garlic mayonnaise drizzled over spiced potato fritter.",
      isVeg: true,
      order: 3,
      visible: true
    },
    {
      id: "menu-4",
      name: "Ulta Vadapav",
      alacartePrice: 45,
      inComboPrice: 40,
      category: "vadapav",
      description: "Pav stuffed inside the batter and deep-fried golden brown. Chef's special!",
      isVeg: true,
      order: 4,
      visible: true
    },
    {
      id: "menu-5",
      name: "Cheese Burst Vadapav",
      alacartePrice: 70,
      inComboPrice: 60,
      category: "vadapav",
      description: "Molten cheese core that oozes on the first bite. Festive superstar!",
      isVeg: true,
      order: 5,
      visible: true
    },
    {
      id: "menu-drink-1",
      name: "Diet Coke (Can / 300ml)",
      alacartePrice: 40,
      inComboPrice: 40,
      category: "drinks",
      description: "Zero sugar chilled refreshment.",
      isVeg: true,
      order: 6,
      visible: true
    },
    {
      id: "menu-drink-2",
      name: "Maja (Mango Drink)",
      alacartePrice: 25,
      inComboPrice: 25,
      category: "drinks",
      description: "Sweet chilled mango delight.",
      isVeg: true,
      order: 7,
      visible: true
    },
    {
      id: "menu-drink-3",
      name: "Thums Up / Sprite",
      alacartePrice: 20,
      inComboPrice: 20,
      category: "drinks",
      description: "Ice cold fizzy soda bottles.",
      isVeg: true,
      order: 8,
      visible: true
    },
    {
      id: "menu-drink-4",
      name: "Packaged Drinking Water",
      alacartePrice: 20,
      inComboPrice: 20,
      category: "drinks",
      description: "Sealed 500ml / 1L mineral water.",
      isVeg: true,
      order: 9,
      visible: true
    }
  ],
  offers: [
    {
      id: "offer-1",
      title: "Follow & Tag",
      tagline: "Get a FREE Small Drink!",
      badge: "INSTAGRAM SPECIAL",
      description: "Follow our Instagram page, tag @mumbai_spice_vadapav in your garba story, and show the screen at the counter. (Applicable on first visit only).",
      actionText: "Open Instagram Profile",
      actionUrl: "https://instagram.com/mumbai_spice_vadapav",
      actionType: "instagram",
      order: 1,
      visible: true
    },
    {
      id: "offer-2",
      title: "Review & Save",
      tagline: "Flat ₹10 OFF on Next Visit",
      badge: "GOOGLE REVIEW",
      description: "Post a genuine Google Review of your experience, show the posted review screen to the stall owner, and get ₹10 OFF on your next order!",
      actionText: "Write a Google Review",
      actionUrl: "https://g.page/r/mumbai-spice-review",
      actionType: "google_review",
      order: 2,
      visible: true
    },
    {
      id: "offer-3",
      title: "Garba After Hours",
      tagline: "Late Night Craving Discount",
      badge: "AFTER 10:00 PM ONLY",
      description: "Hungry after intense dandiya rounds? Post 10:00 PM, enjoy flat ₹10 OFF on the ₹120 Double Burst Combo (Pay only ₹110)!",
      actionText: "Grab After 10 PM at Counter",
      actionType: "info",
      order: 3,
      visible: true
    },
    {
      id: "offer-4",
      title: "Bulk Garba Groups",
      tagline: "Advance Booking for 20+ People",
      badge: "GROUP SAVINGS",
      description: "Coming with your dandiya troupe or society group? Call or WhatsApp ahead to get your hot vadapav batches ready without waiting!",
      actionText: "WhatsApp for Bulk Orders",
      actionUrl: "https://wa.me/919876543210?text=Hi%2C%20we%20want%20to%20place%20a%20bulk%20order%20for%20our%20Garba%20group",
      actionType: "whatsapp",
      order: 4,
      visible: true
    }
  ],
  stampCard: {
    title: "9 DIN, 9 VADAPAV",
    subtitle: "Navratri Loyalty Stamp Challenge",
    ruleBillThreshold: 100,
    milestones: {
      stamp5Reward: "FREE Mumbai Style Vadapav",
      stamp9Reward: "FREE Cheese Burst Vadapav"
    },
    rulesText: [
      "Collect 1 stamp per visit on bills above ₹100.",
      "Get a FREE Mumbai Vadapav on your 5th stamp visit!",
      "Unlock a FREE Cheese Burst Vadapav on your 9th stamp visit!",
      "Stamps are issued strictly at the counter by the stall owner (show your mobile number) or WhatsApp 'STAMP' to our number.",
      "Informational only: Visitors cannot self-stamp on this website."
    ],
    visible: true
  },
  menuNotes: {
    parcelChargesStandard: 5,
    parcelChargesSpecial: 10,
    parcelChargesSpecialItems: "Cheese Burst & Ulta Vadapav",
    drinkChangePolicy: "Drink change in combos is subject to item price difference."
  },
  sections: {
    hero: true,
    combos: true,
    menu: true,
    rewards: true,
    offers: true,
    about: true,
    floatingActions: true
  }
};
