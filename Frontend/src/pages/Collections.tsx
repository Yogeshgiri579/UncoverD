import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { collections } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface CollectionsProps {
  onAddToCart: (product: Product) => void;
}

const Collections = ({ onAddToCart }: CollectionsProps) => {
  const { slug } = useParams<{ slug?: string }>();
  
  const { data: apiProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  
  const allProducts = Array.isArray(apiProducts) ? apiProducts.map(p => ({...p, id: p._id})) : [];
  const filteredProducts = slug ? allProducts.filter((p) => p.collection === slug) : allProducts;

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
              SHOP BY CATEGORY
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Browse our curated collections of mobile skins featuring your favorite themes.
            </p>
          </motion.div>

          {/* Collection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
            {collections.map((col, i) => (
              <motion.div
                key={col.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={col.path} className="group relative block aspect-[3/4] rounded-xl overflow-hidden hover-lift">
                  <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="font-display text-xl font-bold tracking-wider">{col.name.toUpperCase()}</h3>
                    <p className="text-xs text-primary font-semibold mt-1">COLLECTION</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Products by Collection */}
          {slug ? (
            <>
              <h2 className="font-display text-2xl font-bold tracking-wider mb-8">
                {collections.find((c) => c.path.endsWith(slug))?.name ?? "Collection"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {isLoading ? (
                  <div className="col-span-full flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                  ))
                ) : (
                  <div className="col-span-full text-center text-muted-foreground">
                    No products found for this collection.
                  </div>
                )}
              </div>
            </>
          ) : (
            collections.map((col) => {
              const colSlug = col.path.split("/").pop() ?? "";
              const colProducts = allProducts.filter((p) => p.collection === colSlug);
              if (colProducts.length === 0) return null;

              return (
                <div key={col.name} className="mb-16">
                  <h2 className="font-display text-2xl font-bold tracking-wider mb-6">{col.name}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {isLoading ? (
                      <div className="col-span-full flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    ) : (
                      colProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                      ))
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default Collections;
