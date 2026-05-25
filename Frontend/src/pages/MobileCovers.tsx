import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface MobileCoversProps {
  onAddToCart: (product: Product) => void;
}

const filterTabs = ["All", "Sports Car", "Anime", "Marvel", "DC"];

const MobileCovers = ({ onAddToCart }: MobileCoversProps) => {
  const { data: apiProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const allProducts = Array.isArray(apiProducts) ? apiProducts.map(p => ({...p, id: p._id})) : [];
  const covers = allProducts.filter((p) => p.category === "covers" || p.category === "cover");

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider mb-4">
              MOBILE COVERS & CASES
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Stylish and durable phone covers. Buy 1 Get 1 Free on all covers!
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                className="px-4 py-2 rounded-full bg-secondary text-sm font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : covers.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-20">
                No covers available.
              </div>
            ) : (
              covers.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileCovers;
