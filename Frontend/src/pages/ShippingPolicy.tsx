import { motion } from "framer-motion";
import { Truck } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider mb-6">
              SHIPPING POLICY
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about our delivery process.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card rounded-xl p-8 md:p-12 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl font-bold">Shipping Policy</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>Thank you for shopping with <strong className="text-foreground">Uncover D</strong>. We are committed to providing you with a smooth and reliable shopping experience, including safe and timely shipping.</p>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Processing Time</h3>
                <p>Orders are usually processed within <strong className="text-foreground">1–2 business days</strong> (excluding weekends and holidays). Processing time may vary during high-demand periods or promotional events.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Shipping Method</h3>
                <p>We currently offer <strong className="text-foreground">Standard Shipping</strong> for all orders. Shipping charges, if applicable, will be displayed during the checkout process.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Delivery Time</h3>
                <p>Delivery time depends on your location. Standard delivery generally takes <strong className="text-foreground">3–7 business days</strong> for domestic orders.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Order Tracking</h3>
                <p>Once your order is shipped, you will receive a <strong className="text-foreground">shipping confirmation email with tracking details</strong>. You can track your order through the tracking link provided in the email.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Shipping Delays</h3>
                <p>While we aim to deliver orders on time, delays may occur due to factors beyond our control such as weather conditions, courier delays, or other logistical issues.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Change of Address</h3>
                <p>Address changes can only be requested within <strong className="text-foreground">3 hours of placing the order</strong>. Once the order has been shipped, address modifications will not be possible.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Return to Origin (RTO)</h3>
                <p>If delivery fails due to incorrect address or customer unavailability, the courier may attempt delivery multiple times. If the package is returned to us (RTO), the customer may need to pay the <strong className="text-foreground">re-shipping charges</strong> to have the order delivered again.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Policy Updates</h3>
                <p>Uncover D reserves the right to update or modify this shipping policy at any time. Any updates will be reflected on this page.</p>
              </div>

              <p className="pt-4 border-t border-border/50">Thank you for choosing <strong className="text-foreground">Uncover D</strong>. We appreciate your support.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicy;