import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, TrendingUp, Zap, ShieldCheck, Truck, Headphones, Tag } from "lucide-react";

const coreValues = [
  {
    title: "The Foundation",
    content: [
      "Quality is at the center of everything we create. Our goal is to deliver mobile covers that combine durability, comfort, and modern design. We believe a good cover should protect your phone while also enhancing its look. At Uncover D, we focus on simplicity, reliability, and products that fit today's lifestyle."
    ]
  },
  {
    title: "Guiding Principles",
    content: [
      "Our values guide how we design our products, serve our customers, and grow as a brand. We focus on creating mobile covers that combine quality, style, and reliability so customers can trust what they receive.",
      "These values also shape how we work internally and with our partners. We aim to build strong relationships based on transparency, consistency, and shared goals. By staying committed to these principles, we make decisions that prioritize customer satisfaction, product improvement, and long-term growth."
    ]
  },
  {
    title: "In Practice",
    content: [
      "At Uncover D, our values are reflected in the way we design products, work as a team, and interact with customers. Quality is maintained by carefully selecting materials and ensuring every cover meets our standards before reaching customers.",
      "Our focus on modern design encourages our team to constantly explore new styles and ideas that match current trends and customer preferences. Innovation is supported by continuously improving our products and introducing better materials and designs.",
      "We also promote trust and reliability by maintaining clear communication, dependable service, and a commitment to delivering products that customers can rely on every day."
    ]
  }
];

const sections = [
  {
    title: "Growing",
    icon: TrendingUp,
    content: "Uncover D is continuously evolving as we explore new designs, materials, and styles. Our vision is to build a brand that offers modern mobile accessories while keeping quality and design our top priorities. As we grow, we aim to expand our collection and bring better options for customers who value both style and protection."
  },
  {
    title: "Features",
    icon: Zap,
    content: "Our mobile covers are designed to provide the perfect balance between style and protection. With options in plastic, leather, and silicone, we offer covers that are lightweight, comfortable to hold, and built for everyday use. Each design focuses on clean aesthetics while ensuring your device stays protected."
  },
  {
    title: "Why Choose Us",
    icon: ShieldCheck,
    content: "At Uncover D, we focus on creating covers that match modern lifestyles. Our products are selected to offer durability, stylish designs, and a premium feel. We aim to provide covers that not only protect your phone but also complement your everyday style."
  }
];

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider mb-6">
              ABOUT US
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="glass-card rounded-xl p-8 md:p-12 space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
            <p>
              Uncover D was created with a simple idea — your phone cover should do more than just protect your device. It should reflect your style.
            </p>
            <p>
              In a market full of ordinary designs, we focus on covers that feel modern, minimal, and built for everyday life. Our goal is to create products that balance protection, comfort, and aesthetics.
            </p>
            <p>
              Every cover we offer is designed to match the way people use their phones today — constantly, everywhere, and as part of their personal style.
            </p>
            <p className="font-semibold text-foreground text-xl pt-4 text-center">
              At Uncover D, we believe the right cover doesn't just protect your phone, it completes it.
            </p>
          </motion.div>

          {/* Unique Core Values Section (Interactive Tab Slider) */}
          <div className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wider mb-4 flex items-center justify-center gap-3 uppercase">
                <Target className="w-8 h-8 text-primary" />
                Our Core Values
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="glass-card rounded-xl p-2 md:p-4 flex flex-col md:flex-row gap-4 lg:gap-6 shadow-lg"
            >
              <div className="flex md:flex-col gap-2 overflow-x-auto md:w-1/3 pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {coreValues.map((val, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`text-left px-5 py-4 rounded-lg font-semibold transition-all whitespace-nowrap md:whitespace-normal flex-shrink-0 border border-transparent ${
                      activeTab === idx ? "bg-primary text-primary-foreground shadow-md border-primary/20" : "hover:bg-secondary text-muted-foreground hover:border-border"
                    }`}
                  >
                    {val.title}
                  </button>
                ))}
              </div>
              <div className="md:w-2/3 bg-background/50 rounded-lg p-6 md:p-8 flex items-center min-h-[300px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-4 text-muted-foreground leading-relaxed w-full"
                  >
                    {coreValues[activeTab].content.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {sections.map((sec, i) => (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="glass-card rounded-xl p-8 flex flex-col items-start hover-lift"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <sec.icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-4">{sec.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{sec.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-border/50">
            {[
              { icon: ShieldCheck, title: "WELL TRUSTED", desc: "Over 100k customers" },
              { icon: Truck, title: "SUPER FAST", desc: "With Express delivery" },
              { icon: Headphones, title: "EXPERT HELP", desc: "Seven days a week" },
              { icon: Tag, title: "BEST PRICES", desc: "Unbeatable value" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", bounce: 0.4 }}
                className="text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold tracking-wider text-base mb-1 uppercase text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;