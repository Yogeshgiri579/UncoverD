import type { Product } from "./store";

import productCover1 from "@/assets/product-cover-1.jpg";
import productArmour from "@/assets/product-armour.jpg";
import productDc from "@/assets/product-dc.jpg";

export const allProducts: Product[] = [
  { 
    id: "plastic-1", 
    name: "Plastic Rugged Cover", 
    price: 399, 
    originalPrice: 699, 
    image: productCover1, 
    category: "covers", 
    collection: "plastic-covers", 
    badge: "Hot",
    description: "Rugged, everyday protection for your mobile device.",
    details: "The Pastiek Rugged Cover provides ultimate protection with a tough, durable design. Perfect for active lifestyles and everyday use.",
    specifications: [
      { label: "Material", value: "TPU + Polycarbonate" },
      { label: "Drop Protection", value: "Up to 6 feet" },
      { label: "Design", value: "Rugged Pattern" },
      { label: "Shock Absorption", value: "Military Grade" },
      { label: "Raised Edges", value: "Screen & Camera Protection" }
    ],
    inStock: true
  },
  { 
    id: "leather-1", 
    name: "Leather Slim Armor", 
    price: 449, 
    originalPrice: 749, 
    image: productDc, 
    category: "covers", 
    collection: "leather-covers", 
    description: "Slim armor with premium finish for sophisticated protection.",
    details: "The Ladar Slim Armor offers premium protection in a sleek, slim design. Perfect for those who want style without bulk.",
    specifications: [
      { label: "Material", value: "Premium TPU" },
      { label: "Profile", value: "Ultra Slim" },
      { label: "Finish", value: "Premium Glossy" },
      { label: "Protection", value: "Full Coverage" },
      { label: "Weight", value: "Lightweight" }
    ],
    inStock: true
  },
  { 
    id: "silicone-1", 
    name: "Silicone Shock Resistant Case", 
    price: 499, 
    originalPrice: 799, 
    image: productArmour, 
    category: "covers", 
    collection: "silicone-covers", 
    badge: "New",
    description: "Soft-touch silicone protection that's shock resistant.",
    details: "The Silicone Shock Resistant Case provides excellent shock absorption with a soft, comfortable grip. Ideal for drop protection.",
    specifications: [
      { label: "Material", value: "Premium Silicone" },
      { label: "Shock Absorption", value: "High Impact" },
      { label: "Grip", value: "Soft Touch" },
      { label: "Durability", value: "Long Lasting" },
      { label: "Color Options", value: "Multiple" }
    ],
    inStock: true
  },
];

export const categories = [
  { name: "Plastic Covers", description: "Rugged, everyday protection", image: productCover1, path: "/collections/plastic-covers" },
  { name: "Leather Covers", description: "Slim armor with premium finish", image: productDc, path: "/collections/leather-covers" },
  { name: "Silicone Covers", description: "Soft-touch and shock resistant", image: productArmour, path: "/collections/silicone-covers" },
];

export const brands = [
  "Apple", "Samsung", "OnePlus", "Google", "Nothing", "Xiaomi",
  "Realme", "Oppo", "Vivo", "iQOO", "Poco", "Motorola",
  "Infinix", "Asus", "Tecno",
];

export const collections = [
  { name: "Plastic Covers", path: "/collections/plastic-covers", image: productCover1 },
  { name: "Leather Covers", path: "/collections/leather-covers", image: productDc },
  { name: "Silicone Covers", path: "/collections/silicone-covers", image: productArmour },
];
