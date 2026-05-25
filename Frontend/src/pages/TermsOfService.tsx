import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const TermsOfService = () => {
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
              TERMS OF SERVICE
            </h1>
            <p className="text-muted-foreground text-lg">
              Please read these terms carefully before using our services.
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
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl font-bold">Terms of Service</h2>
            </div>
            
            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">OVERVIEW</h3>
                <p>
                  This website is operated by <strong className="text-foreground">Uncover U</strong>. Throughout the site, the terms &quot;we&quot;, &quot;us&quot; and &quot;our&quot; refer to <strong className="text-foreground">Uncover U</strong>. Uncover U offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                </p>
                <p>
                  By visiting our site and/or purchasing something from us, you engage in our &quot;Service&quot; and agree to be bound by the following Terms of Service (&quot;Terms&quot;). These Terms apply to all users of the site including browsers, vendors, customers, merchants and contributors of content.
                </p>
                <p>
                  If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
                </p>
                <p>
                  Our store is hosted on <strong className="text-foreground">Shopify Inc.</strong>, which provides the e-commerce platform that allows us to sell our products and services.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 1 – ONLINE STORE TERMS</h3>
                <p>By agreeing to these Terms of Service, you confirm that you are at least the age of majority in your place of residence.</p>
                <p>You may not use our products for any illegal or unauthorized purpose.</p>
                <p>Any breach of these Terms may result in termination of your access to our services.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 2 – GENERAL CONDITIONS</h3>
                <p>We reserve the right to refuse service to anyone at any time for any reason.</p>
                <p>You agree not to reproduce, duplicate, copy, sell or exploit any portion of the Service without written permission from us.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 3 – ACCURACY OF INFORMATION</h3>
                <p>We are not responsible if information on this website is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 4 – MODIFICATIONS TO SERVICES AND PRICES</h3>
                <p>Prices for our products may change without notice.</p>
                <p>We reserve the right to modify or discontinue the service (or any part of it) at any time without notice.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 5 – PRODUCTS OR SERVICES</h3>
                <p>Certain products may be available exclusively online through the website. These products may have limited quantities and are subject to return or exchange according to our <strong className="text-foreground">Refund Policy</strong>.</p>
                <p>We make every effort to display product images and colors as accurately as possible. However, we cannot guarantee that your device screen will display colors exactly.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 6 – BILLING AND ACCOUNT INFORMATION</h3>
                <p>We reserve the right to refuse or cancel any order you place with us.</p>
                <p>You agree to provide current, complete and accurate purchase information for all orders made on our store.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 7 – OPTIONAL TOOLS</h3>
                <p>We may provide access to third-party tools that we do not monitor or control. Your use of such tools is entirely at your own risk.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 8 – THIRD-PARTY LINKS</h3>
                <p>Our website may contain links to third-party websites. We are not responsible for examining or evaluating their content or accuracy.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 9 – USER COMMENTS AND FEEDBACK</h3>
                <p>If you send suggestions, ideas or feedback, you agree that we may use them without restriction and without obligation to compensate you.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 10 – PERSONAL INFORMATION</h3>
                <p>Your submission of personal information through the store is governed by our <strong className="text-foreground">Privacy Policy</strong>.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 11 – ERRORS AND INACCURACIES</h3>
                <p>Occasionally there may be errors in product descriptions, pricing or availability. We reserve the right to correct such errors at any time without prior notice.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 12 – PROHIBITED USES</h3>
                <p>You are prohibited from using the website for unlawful purposes, violating intellectual property rights, spreading malware, collecting personal information of others, or engaging in abusive or harmful behavior.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 13 – DISCLAIMER OF WARRANTIES</h3>
                <p>We do not guarantee that the service will be uninterrupted, secure or error-free. Your use of the service is at your own risk.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 14 – LIMITATION OF LIABILITY</h3>
                <p>In no case shall <strong className="text-foreground">Uncover U</strong>, its employees, partners or service providers be liable for any direct or indirect damages arising from your use of our services or products.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 15 – INDEMNIFICATION</h3>
                <p>You agree to indemnify and hold harmless <strong className="text-foreground">Uncover U</strong> and its partners from any claim or demand arising from your breach of these Terms.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 16 – TERMINATION</h3>
                <p>These Terms remain effective unless terminated by either you or us. If you violate any term, we may terminate your access to the service.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 17 – GOVERNING LAW</h3>
                <p>These Terms of Service shall be governed by and interpreted in accordance with the <strong className="text-foreground">laws of India</strong>.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 18 – CHANGES TO TERMS</h3>
                <p>We reserve the right to update or modify these Terms of Service at any time. Continued use of the website after changes means you accept those changes.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SECTION 19 – CONTACT INFORMATION</h3>
                <p>Questions about the Terms of Service can be sent to:</p>
                <ul className="list-none space-y-1 mt-2">
                  <li><strong className="text-foreground">Trade Name:</strong> Uncover U</li>
                <li><strong className="text-foreground">Email:</strong> thedofficial27@gmail.com</li>
                <li><strong className="text-foreground">Contact Number:</strong> +91 9303149770</li>
                <li><strong className="text-foreground">Address:</strong> 29, Shri Sampada Row House, Opposite of Baba Shri Resort, Ahead of Manushree Nagar, Indore – 452005, Madhya Pradesh, India</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;