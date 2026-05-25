import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.482-1.46-1.656-1.758-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const Footer = () => (
  <footer className="bg-card border-t border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-1 mb-2">
            <img src={logo} alt="Uncover D Logo" className="h-14 w-auto object-contain" />
            <span className="font-display text-2xl font-bold tracking-wider text-gradient">
              Uncover D
            </span>
          </Link>
          <p className="text-sm text-muted-foreground mt-3">
            Premium mobile skins, covers & accessories. Express your style.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://www.instagram.com/uncover_d_?igsh=MWsza2NsaGdmaTQ1cw==" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://wa.me/919303149770" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-[#25D366] hover:bg-secondary/80 transition-colors">
              <WhatsappIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold tracking-wider text-sm mb-4">SHOP</h4>
          <div className="space-y-2">
            {[["Mobile Covers", "/mobile-covers"], ["Shop by Category", "/collections"]].map(([label, path]) => (
              <Link key={path} to={path} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold tracking-wider text-sm mb-4">ALL ABOUT UNCOVER D</h4>
          <div className="space-y-2">
            {[
              { label: "About Us", path: "/about-us" },
              { label: "Shipping Policy", path: "/shipping-policy" },
              { label: "Refund Policy", path: "/refund-policy" },
              { label: "Contact Us", path: "/contact-us" },
              { label: "Privacy Policy", path: "/privacy-policy" },
              { label: "Terms of Service", path: "/terms-of-service" },
            ].map((item) => (
              <Link key={item.label} to={item.path} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold tracking-wider text-sm mb-4">NEWSLETTER</h4>
          <p className="text-sm text-muted-foreground mb-3">Get updates on new drops & exclusive offers.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-3 py-2 rounded-l-lg bg-secondary border border-border text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="px-4 py-2 rounded-r-lg bg-primary text-primary-foreground">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Uncover D. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
