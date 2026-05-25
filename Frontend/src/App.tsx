import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { apiRequest } from "@/lib/api";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Profile from "./pages/Profile";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import { useCart } from "@/lib/store";
import type { Product } from "@/lib/store";
import Index from "./pages/Index";
import Collections from "./pages/Collections";
import MobileCovers from "./pages/MobileCovers";
import AntiYellowArmour from "./pages/AntiYellowArmour";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";

const queryClient = new QueryClient();

const AppContent = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const { items, addItem, updateQty, removeItem, count } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setCartOpen(true);
  };

  const handleAuthSuccess = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    toast.success("Signed in successfully.");
  };

  const handleAccountClick = () => {
    if (token) {
      navigate("/profile");
    } else {
      setAuthOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully.");
  };

  const handleCheckout = async () => {
    if (!token) {
      toast.error("Please sign in before checking out.");
      setAuthOpen(true);
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderPayload = {
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        qty: item.quantity,
        price: item.price,
        image: item.image,
      })),
      shippingAddress: {
        address: "123 Main Street",
        city: "Indore",
        postalCode: "452005",
        state: "Madhya Pradesh",
        country: "India",
        phone: "9999999999",
      },
      paymentMethod: "PayU",
      itemsPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    try {
      const data = await apiRequest("/orders", {
        method: "POST",
        body: orderPayload,
        token,
      });

      toast.success("Checkout successful. Order created: " + data._id);
      setCartOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Checkout failed.");
    }
  };

  return (
    <>
      <style>{`
        nav { top: 40px !important; }
      `}</style>
      <Link to="/collections" className="fixed top-0 left-0 right-0 z-50 block bg-primary text-primary-foreground text-sm font-semibold overflow-hidden h-[40px] flex items-center">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 80, repeat: Infinity }}
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="px-8">Uncover D – Covers That Match Your Style ✨ BUY ONE GET THREE</span>
          ))}
        </motion.div>
      </Link>
      <Navbar
        onSearchOpen={() => setSearchOpen(true)}
        onCartOpen={() => setCartOpen(true)}
        onAccountClick={handleAccountClick}
        cartCount={count}
        isAuthenticated={Boolean(token)}
      />
      <main className="pt-[40px]">
        <Routes>
          <Route path="/" element={<Index onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/collections" element={<Collections onAddToCart={handleAddToCart} />} />
          <Route path="/collections/:slug" element={<Collections onAddToCart={handleAddToCart} />} />
          <Route path="/mobile-covers" element={<MobileCovers onAddToCart={handleAddToCart} />} />
          <Route path="/mobile-covers/:category" element={<MobileCovers onAddToCart={handleAddToCart} />} />
          <Route path="/anti-yellow-armour" element={<AntiYellowArmour onAddToCart={handleAddToCart} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
        </Routes>
      </main>
      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthSuccess={handleAuthSuccess} />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
