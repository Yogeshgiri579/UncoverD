import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const ContactUs = () => {
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
              CONTACT US
            </h1>
            <p className="text-muted-foreground text-lg">
              Get in touch with us for any queries or support.
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
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl font-bold">Contact Information</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <div>
                <strong className="text-foreground">Legal Name:</strong> D (Not trademarked yet)
              </div>
              <div>
                <strong className="text-foreground">Trade Name:</strong> Uncover U
              </div>
              <div>
                <strong className="text-foreground">Email:</strong> <a href="mailto:thedofficial27@gmail.com" className="text-primary hover:underline">thedofficial27@gmail.com</a>
              </div>
              <div>
                <strong className="text-foreground">Contact Number:</strong> <a href="tel:+919303149770" className="text-primary hover:underline">+91 9303149770</a>
              </div>
              <div className="pt-2 border-t border-border/50">
                <strong className="text-foreground block mb-2 mt-4">Physical Address:</strong>
                <address className="not-italic">
                  29, Shri Sampada Row House<br />
                  Opposite of Baba Shri Resort<br />
                  Ahead of Manushree Nagar<br />
                  Indore – 452005<br />
                  Madhya Pradesh<br />
                  India
                </address>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;