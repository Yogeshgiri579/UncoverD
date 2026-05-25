import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

interface NavbarProps {
  onSearchOpen: () => void;
  onCartOpen: () => void;
  onAccountClick: () => void;
  cartCount: number;
  isAuthenticated: boolean;
}

const navItems = [
  {
    label: "Shop by Category",
    path: "/collections",
    dropdown: [
      { label: "ALL CATEGORIES", path: "/collections" },
      { label: "Plastic Covers", path: "/collections/plastic-covers" },
      { label: "Leather Covers", path: "/collections/leather-covers" },
      { label: "Silicone Covers", path: "/collections/silicone-covers" },
    ],
  },
  {
    label: "Mobile Cover",
    path: "/mobile-covers",
    dropdown: [
      { label: "All Covers", path: "/mobile-covers" },
      { label: "Sports Car Covers", path: "/mobile-covers/sports-car" },
      { label: "Anime Covers", path: "/mobile-covers/anime" },
      { label: "Marvel Covers", path: "/mobile-covers/marvel" },
      { label: "DC Covers", path: "/mobile-covers/dc" },
    ],
  },
];

const Navbar = ({ onSearchOpen, onCartOpen, onAccountClick, cartCount, isAuthenticated }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <img src={logo} alt="Uncover D Logo" className="h-10 md:h-12 w-auto object-contain" />
            <span className="font-display text-2xl font-bold tracking-wider text-gradient">
              Uncover D
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                    location.pathname.startsWith(item.path)
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-3 h-3" />}
                </Link>

                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 glass-card rounded-lg shadow-xl overflow-hidden"
                      >
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSearchOpen}
              className="p-2 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onAccountClick}
              className={`p-2 transition-colors ${isAuthenticated ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={onCartOpen}
              className="p-2 text-foreground/70 hover:text-foreground transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown?.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      onClick={() => setMobileOpen(false)}
                      className="block pl-8 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
