import { motion } from "framer-motion";
import { RotateCcw, PackageCheck, AlertTriangle } from "lucide-react";

const RefundPolicy = () => {
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
              REFUND POLICY
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about our return and refund process.
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
                <RotateCcw className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl font-bold">Return Policy</h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>At <strong className="text-foreground">Uncover D</strong>, customer satisfaction is important to us. Our mobile covers are carefully designed and checked to ensure quality and reliability. Because of the nature of our products, we generally do not accept returns unless there is a defect or issue with the product.</p>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-yellow-500"/> Damaged or Defective Products</h3>
                <p>If you receive a product that is damaged, defective, or incorrect, we will gladly help resolve the issue. Customers can request a return or replacement within <strong className="text-foreground">7 days of receiving the order</strong> if the issue is related to a manufacturing defect or damage during delivery.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2"><PackageCheck className="w-5 h-5 text-green-500"/> How to Request a Return</h3>
                <p>If you believe your product has a defect, please contact us within <strong className="text-foreground">7 days of receiving the order</strong>. When submitting your request, please provide details about the issue along with clear photos of the product. Our team will review the request and guide you through the next steps.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Return Conditions</h3>
                <p>To be eligible for a return or replacement:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The request must be made within <strong className="text-foreground">7 days of delivery</strong>.</li>
                  <li>The product must have a <strong className="text-foreground">manufacturing defect, damage, or incorrect item received</strong>.</li>
                  <li>Proof of the issue (such as images) may be required for verification.</li>
                </ul>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mt-6">
                <h3 className="font-bold text-foreground mb-2">Refund or Replacement</h3>
                <p className="text-sm">After receiving and inspecting the returned product, if the issue is confirmed from our side, we will either provide a <strong className="text-foreground">replacement or a refund</strong>, depending on the situation.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Policy Updates</h3>
                <p>Uncover D reserves the right to update or modify this policy at any time. Any changes will be updated on this page.</p>
              </div>

              <p className="pt-4 border-t border-border/50">Thank you for choosing <strong className="text-foreground">Uncover D</strong>.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;