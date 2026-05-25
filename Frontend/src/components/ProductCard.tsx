import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Product } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group glass-card rounded-xl overflow-hidden hover-lift cursor-pointer h-full"
  >
    <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden block">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {product.badge && (
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary text-primary-foreground">
          {product.badge}
        </span>
      )}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart(product); }}
        className="absolute bottom-3 right-3 p-2.5 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
      >
        <ShoppingBag className="w-4 h-4" />
      </button>
    </Link>
    <Link to={`/product/${product.id}`} className="p-4 block">
      <h3 className="text-sm font-medium truncate hover:text-primary transition-colors">{product.name}</h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-bold text-primary">₹{product.price}</span>
        {product.originalPrice && (
          <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
        )}
      </div>
    </Link>
  </motion.div>
);

export default ProductCard;
