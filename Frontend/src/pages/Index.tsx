import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Truck, RotateCcw, Star, Tag, Banknote, ThumbsUp, Gift } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import appleLogo from "@/assets/slider-logo/apple.webp";
import miLogo from "@/assets/slider-logo/mi.webp";
import oppoLogo from "@/assets/slider-logo/oppo.webp";
import realmeLogo from "@/assets/slider-logo/reamle.webp";
import samsungLogo from "@/assets/slider-logo/sam.webp";
import vivoLogo from "@/assets/slider-logo/vivo.webp";
import { categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface IndexProps {
  onAddToCart: (product: Product) => void;
}

const features = [
  { icon: Shield, title: "Premium Quality", desc: "3M vinyl with bubble-free application" },
  { icon: Truck, title: "Free Shipping", desc: "On orders above ₹499" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free returns" },
  { icon: Star, title: "5000+ Reviews", desc: "Trusted by thousands" },
];

const logos = [appleLogo, miLogo, oppoLogo, realmeLogo, samsungLogo, vivoLogo];

const Index = ({ onAddToCart }: IndexProps) => {
  const { data: apiProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const products = Array.isArray(apiProducts) ? apiProducts.map(p => ({...p, id: p._id})) : [];
  const featuredProducts = products.filter((p) => p.badge).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroBanner}
            alt="Cosmos Layers Hero"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-primary/20 text-primary rounded-full mb-4">
              New Year Sale 2026
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[0.9] tracking-tight mb-4">
              SKIN YOUR
              <br />
              <span className="text-gradient">DEVICE</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Premium mobile skins, covers & cases. Express your personality with designs that turn heads.
            </p>
            <div className="flex gap-3">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold tracking-wider text-sm hover:bg-primary/90 transition-colors"
              >
                SHOP NOW <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <f.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-center tracking-wider mb-10"
          >
            OUR PRODUCTS
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={cat.path} className="group block glass-card rounded-xl overflow-hidden hover-lift">
                  <div className="aspect-square overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-display font-semibold tracking-wider text-sm">{cat.name.toUpperCase()}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Slider */}
      <section className="bg-white py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-center whitespace-nowrap cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -1000, right: 1000 }}
            whileHover={{ animationPlayState: "paused" }}
            animate={{ x: ["0%", "-100%"] }}
            transition={{ ease: "linear", duration: 80, repeat: Infinity }}
          >
            {Array(16).fill(logos).flat().map((logo, i) => (
              <img key={i} src={logo} alt="brand logo" className="h-12 w-20 mx-10 flex-shrink-0 object-contain pointer-events-none" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold tracking-wider"
            >
              TRENDING NOW
            </motion.h2>
            <Link to="/collections" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-10">
                No trending products available right now.
              </div>
            ) : (
              featuredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose UncoverD */}
      <section className="section-padding bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-center tracking-wider mb-10"
          >
            WHY CHOOSE UNCOVERD
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Tag, title: "MOST AFFORDABLE BRAND OF INDIA", desc: "Skins at ₹ 199" },
              { icon: Banknote, title: "CASH ON DELIVERY AVAILABLE", desc: "Only Brand in India" },
              { icon: ThumbsUp, title: "RELIABLE AS F##K", desc: "12000+ Orders Delivered" },
              { icon: Gift, title: "FREEBIES WITH EVERY PURCHASE", desc: "Gifts worth ₹ 599 offer ends soon" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-xl text-center flex flex-col items-center hover-lift"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-semibold tracking-wider text-sm mb-2 uppercase">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold tracking-wider mb-8 uppercase"
          >
            About Us
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>Your phone is part of your everyday style, and the cover you choose should reflect that.</p>
            <p>We created this brand to bring mobile covers that combine protection with modern aesthetics. Our focus is simple: clean designs, premium feel, and covers that match today's lifestyle.</p>
            <p>From durable plastic covers to premium leather finishes and soft silicone designs, our collection is built to offer both style and reliability.</p>
            <p>We believe a good cover should protect your phone while upgrading the way it looks and feels in your hand.</p>
            <p className="font-semibold text-foreground text-xl mt-8">No loud designs. No cheap vibes. Just covers that fit your style.</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Index;
