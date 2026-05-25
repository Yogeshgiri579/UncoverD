import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Check, Truck, CreditCard, ShieldCheck, Clock, Star, StarHalf, X as XIcon, Loader2 } from "lucide-react";
import type { Product } from "@/lib/store";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "@/lib/api";
import img1 from "@/assets/img-1.webp";
import img2 from "@/assets/img-2.webp";
import img3 from "@/assets/img-3.webp";

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

const mobileModels = [
  {
    label: "Apple",
    options: [
      "Apple iPhone 17 (5G)",
      "Apple iPhone 17 Pro (5G)",
      "Apple iPhone 17 Pro Max (5G)",
      "Apple iPhone 16 (5G)",
      "Apple iPhone 16 Plus (5G)",
      "Apple iPhone 16 Pro (5G)",
      "Apple iPhone 16 Pro Max (5G)",
      "Apple iPhone 15 (5G)",
      "Apple iPhone 15 Plus (5G)",
      "Apple iPhone 15 Pro (5G)",
      "Apple iPhone 15 Pro Max (5G)",
      "Apple iPhone 14 (5G)",
      "Apple iPhone 14 Pro (5G)",
      "Apple iPhone 14 Pro Max (5G)",
      "Apple iPhone 13 (5G)",
      "Apple iPhone 13 Pro (5G)",
      "Apple iPhone 13 Pro Max (5G)",
      "Apple iPhone 12 (5G)",
      "Apple iPhone 12 Pro Max (5G)",
      "Apple iPhone 11",
      "Apple iPhone 11 Pro",
      "Apple iPhone XS",
      "Apple iPhone 7 Plus"
    ]
  },
  {
    label: "Samsung",
    options: [
      "Samsung Galaxy S23 Ultra (5G)",
      "Samsung Galaxy S24 Ultra (5G)",
      "Samsung Galaxy S25 (5G)",
      "Samsung Galaxy S25 Ultra (5G)",
      "Samsung Galaxy S26 Ultra (5G)",
      "Samsung Galaxy A06 (5G)",
      "Samsung Galaxy A07 (5G)",
      "Samsung Galaxy A14 (5G)",
      "Samsung Galaxy A15 (5G)",
      "Samsung Galaxy A16 (5G)",
      "Samsung Galaxy A17 (5G)",
      "Samsung Galaxy A26 (5G)",
      "Samsung Galaxy A35 (5G)",
      "Samsung Galaxy A36 (5G)",
      "Samsung Galaxy A55 (5G)",
      "Samsung Galaxy A56 (5G)",
      "Samsung Galaxy F06 (5G)",
      "Samsung Galaxy F17",
      "Samsung Galaxy F36 (5G)",
      "Samsung Galaxy M06 (5G)",
      "Samsung Galaxy M16 (5G)",
      "Samsung Galaxy M17 (5G)",
      "Samsung Galaxy M36 (5G)",
      "Samsung Galaxy M56 (5G)"
    ]
  },
  {
    label: "Vivo",
    options: [
      "Vivo X200 FE (5G)",
      "Vivo X200 Pro (5G)",
      "Vivo X300 (5G)",
      "Vivo X300 Pro (5G)",
      "Vivo V40e (5G)",
      "Vivo V50e (5G)",
      "Vivo V60 (5G)",
      "Vivo V60e (5G)",
      "Vivo T4R (5G)",
      "Vivo T4 Pro (5G)",
      "Vivo T4x (5G)",
      "Vivo Y12",
      "Vivo Y16",
      "Vivo Y18",
      "Vivo Y19",
      "Vivo Y19e",
      "Vivo Y19s",
      "Vivo Y20",
      "Vivo Y21",
      "Vivo Y29 (5G)",
      "Vivo Y31",
      "Vivo Y31 Pro (5G)",
      "Vivo Y39 (5G)",
      "Vivo Y58 (5G)",
      "Vivo Y300 (5G)",
      "Vivo Y400 (5G)",
      "Vivo Y400 Pro (5G)",
      "Vivo Y500 (5G)"
    ]
  },
  {
    label: "Oppo / Realme",
    options: [
      "Oppo A3x (5G)",
      "Oppo A3 Pro (5G)",
      "Oppo A5 5G (5G)",
      "Oppo A5 Pro 5G (5G)",
      "Oppo A5x (5G)",
      "Oppo A15",
      "Oppo A16",
      "Oppo A18",
      "Oppo A38",
      "Oppo A59 (5G)",
      "Oppo F29 (5G)",
      "Oppo F31 (5G)",
      "Oppo F31 Pro (5G)",
      "Oppo K13 (5G)",
      "Oppo Reno 14 (5G)",
      "Oppo Reno 14 Pro (5G)",
      "Oppo Reno 15 (5G)",
      "Realme 14x (5G)",
      "Realme 15 (5G)",
      "Realme 15x (5G)",
      "Realme 15 Pro (5G)"
    ]
  },
  {
    label: "Xiaomi / Redmi",
    options: [
      "Xiaomi Redmi A3",
      "Xiaomi Redmi A3x",
      "Xiaomi Redmi A4 (5G)",
      "Xiaomi Redmi A5 (5G)",
      "Xiaomi Redmi 9A",
      "Xiaomi Redmi 9C",
      "Xiaomi Redmi 12 (5G)",
      "Xiaomi Redmi 13 4G",
      "Xiaomi Redmi 13 (5G)",
      "Xiaomi Redmi 13C (5G)",
      "Xiaomi Redmi 14C (5G)",
      "Xiaomi Redmi 15 (5G)",
      "Xiaomi Redmi 15C (5G)",
      "Xiaomi Redmi Note 11",
      "Xiaomi Redmi Note 12 (5G)",
      "Xiaomi Redmi Note 13 (5G)",
      "Xiaomi Redmi Note 14 (5G)",
      "Xiaomi Redmi Note 15 (5G)",
      "Xiaomi Redmi Note 15 Pro (5G)"
    ]
  }
];

const reviews = [
  {
    name: "Rishabh Raj",
    date: "07 Mar 25",
    quality: "Top-notch 👌",
    text: "Loved the fit and finish. The skin feels premium and adds a whole new look to my phone. It was easy to apply too.",
    verified: true,
  },
  {
    name: "Akash Sinha",
    date: "26 Dec 24",
    quality: "Excellent 💯",
    text: "Great customer support! I had a query regarding my order and they responded quickly. Skin looks fantastic and fits perfectly.",
    verified: true,
  },
  {
    name: "Rahul Singh",
    date: "14 Feb 25",
    quality: "Impressive ✨",
    text: "The design is so vibrant and sharp. Packaging was neat and delivery was earlier than expected.",
    verified: true,
  },
  {
    name: "Shubham",
    date: "03 Nov 24",
    quality: "Amazing feel 🤩",
    text: "Really appreciate the texture and grip the skin provides. Plus, they even included a small tool for easier application.",
    verified: true,
  },
  {
    name: "Isha Mehta",
    date: "20 Jul 24",
    quality: "Perfect Fit 🔥",
    text: "Fits like a glove. No air bubbles and the material is durable. Loved the entire unboxing experience!",
    verified: true,
  },
  {
    name: "Rahul Varma",
    date: "09 May 24",
    quality: "Very Premium 💎",
    text: "I ordered two skins and both were delivered in great condition. Also, the instructions inside the box were clear.",
    verified: true,
  },
  {
    name: "Tanya S",
    date: "01 Feb 25",
    quality: "Outstanding 💥",
    text: "The finish on the skin is just too good. Gives my phone a new personality. Will definitely recommend!",
    verified: true,
  },
  {
    name: "Ankit Sharma",
    date: "17 Jan 25",
    quality: "Fantastic 💖",
    text: "I messed up the alignment the first time and asked for help — support was super helpful. Reapplied it easily!",
    verified: true,
  },
  {
    name: "Vaibhav R",
    date: "28 Sep 24",
    quality: "Just Wow 🤯",
    text: "Delivery was surprisingly fast. And the skin? Gorgeous! Didn’t expect it to be this good honestly.",
    verified: true,
  },
  {
    name: "Divya Chauhan",
    date: "11 Dec 24",
    quality: "Durable & Stylish 😎",
    text: "Been using the skin for 3 months now and it’s still looking brand new. Great stuff.",
    verified: true,
  },
];

const ProductDetail = ({ onAddToCart }: ProductDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: apiProduct, isLoading: productLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
  });

  const { data: apiProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const product = apiProduct ? { ...apiProduct, id: apiProduct._id } : null;
  const allProducts = Array.isArray(apiProducts) ? apiProducts.map(p => ({...p, id: p._id})) : [];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const brands = ["Apple", "Samsung", "Vivo", "Oppo / Realme", "Xiaomi / Redmi"];
  const currentModels = selectedBrand ? mobileModels.find(g => g.label === selectedBrand)?.options || [] : [];

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectedModel(""); // Reset model when brand changes
  };

  if (productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold tracking-wider text-sm hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden glass-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-primary text-primary-foreground">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-destructive text-destructive-foreground">
                  -{discount}%
                </span>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider mb-4">
                  {product.category}
                </span>
                {product.collection && (
                  <span className="inline-flex items-center ml-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                    {product.collection}
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400 gap-0.5">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <StarHalf className="w-5 h-5 fill-current" />
                </div>
                <span className="text-sm text-muted-foreground">(847 reviews)</span>
              </div>

              <p className="text-muted-foreground text-lg mb-4">
                {product.description}
              </p>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                      <span className="text-sm font-semibold text-green-500">Save ₹{product.originalPrice - product.price}</span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {product.inStock !== false ? (
                  <span className="text-green-500 font-semibold">✓ In Stock - Ships in 2-3 business days</span>
                ) : (
                  <span className="text-destructive font-semibold">Out of Stock</span>
                )}
              </p>

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-display text-lg font-semibold mb-3">About This Product</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.details}
                </p>
              </div>
            </div>

            {/* Mobile Model Selector */}
            <div className="mb-8 flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2">Select Brand</label>
                <Select value={selectedBrand} onValueChange={handleBrandChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2">Select Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedBrand}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={selectedBrand ? "Select Model" : "Select Brand First"} />
                  </SelectTrigger>
                  <SelectContent>
                    {currentModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold tracking-wider text-sm hover:bg-primary/90 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                ADD TO CART
              </button>
              <button className="px-6 py-4 rounded-lg border border-border text-foreground font-display font-semibold tracking-wider text-sm hover:bg-secondary transition-colors">
                ❤️
              </button>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 glass-card rounded-xl p-8"
        >
          <h2 className="font-display text-2xl font-bold mb-8">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                subtitle: "on all Orders",
              },
              {
                icon: CreditCard,
                title: "COD Available",
                subtitle: "Pay on Delivery",
              },
              {
                icon: ShieldCheck,
                title: "Secure Checkout",
                subtitle: "Secure Payment",
              },
              {
                icon: Clock,
                title: "Delivery Time",
                subtitle: "4 - 5 Business Days",
              },
            ].map((spec, i) => (
              <div key={i} className="flex items-start gap-4 pb-6 border-b border-border/50 last:border-b-0">
                <spec.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-semibold">{spec.title}</p>
                  <p className="text-sm text-muted-foreground">{spec.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex justify-center">
            <img
              src={img1}
              alt="Why choose this product"
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="mt-8 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3 text-foreground">Compatible with iPhone & Android</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our Premium Glass Cases are available for all major brands — Apple, OnePlus, Samsung, Pixel, Xiaomi, Oppo, Vivo, Realme, and more. No matter your device, we’ve got it covered.
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <img
              src={img2}
              alt="Compatible devices"
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="mt-8 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3 text-foreground">360° Protection Meets Style</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Crafted with a durable silicone frame and a sleek glass back, our cases offer all-around protection while maintaining a premium, elegant look. Form meets function — effortlessly.
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <img
              src={img3}
              alt="Protection and style"
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="mt-8 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3 text-foreground">1000+ Eye-Catching Designs</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Express yourself with one-of-a-kind prints that won’t fade over time. From minimal to wild, there’s a design for every mood and personality.
            </p>
          </div>
        </motion.div>

        {/* Customer Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl font-bold mb-8">Customer Reviews</h2>
          <div className="glass-card rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <span className="text-6xl font-bold text-primary">4.5</span>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex text-yellow-400 mb-1 gap-0.5">
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                  <StarHalf className="w-6 h-6 fill-current" />
                </div>
                <span className="text-muted-foreground font-medium">(569 verified reviews)</span>
              </div>
            </div>
            <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all">
              Write a Review
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-xl p-6 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-full h-40 bg-secondary rounded-lg mb-4"></div>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
                <p className="text-sm font-bold mb-2">Product Quality : {review.quality}</p>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{review.text}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-4 mt-auto">
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p>{review.date}</p>
                  </div>
                  {review.verified && <div className="flex items-center gap-1 text-green-500 font-semibold"><Check className="w-4 h-4" /><span>Verified Buyer</span></div>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group glass-card rounded-xl overflow-hidden hover-lift cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary text-primary-foreground">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium truncate">{p.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm font-bold text-primary">₹{p.price}</span>
                      {p.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">₹{p.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
