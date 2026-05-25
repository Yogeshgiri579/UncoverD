import { motion } from "framer-motion";
import { Shield, Check } from "lucide-react";
import { allProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/store";

interface AntiYellowArmourProps {
  onAddToCart: (product: Product) => void;
}

const features = [
  "Anti-Yellow Technology",
  "Military Grade Protection",
  "Crystal Clear Transparency",
  "Reinforced Corner Bumpers",
  "Wireless Charging Compatible",
  "Scratch Resistant Surface",
];

const AntiYellowArmour = ({ onAddToCart }: AntiYellowArmourProps) => {
  const armourProducts = allProducts.filter((p) => p.category === "armour");

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-4">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Maximum Protection</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider mb-4">
              ANTI YELLOW ARMOUR CASES
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Our premium armour edge cases stay crystal clear, never turning yellow. Military-grade drop protection for your device.
            </p>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">{f}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {armourProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AntiYellowArmour;
