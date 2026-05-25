import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
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
              PRIVACY POLICY
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: 12/02/2024
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
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl font-bold">Privacy Policy</h2>
            </div>
            
            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <div className="space-y-4">
                <p>
                  This Privacy Policy describes how <strong className="text-foreground">Uncover U</strong> (&quot;the Site&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from our website (the &quot;Site&quot;) or otherwise communicate with us (collectively, the &quot;Services&quot;). For purposes of this Privacy Policy, &quot;you&quot; and &quot;your&quot; means the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
                </p>
                <p>
                  Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree, please do not use or access our Services.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Changes to This Privacy Policy</h3>
                <p>We may update this Privacy Policy from time to time to reflect changes to our practices or for operational, legal, or regulatory reasons. We will post the updated Privacy Policy on this page and revise the &quot;Last updated&quot; date.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">How We Collect and Use Your Personal Information</h3>
                <p>To provide our services, we collect personal information from different sources depending on how you interact with our website.</p>
                <p>We may use this information to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Communicate with you</li>
                  <li>Process and deliver your orders</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect our services, business, and customers</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">What Personal Information We Collect</h3>
                <p>The types of personal information we collect may include:</p>
                
                <h4 className="font-bold text-foreground mt-4">Contact Details</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping and billing address</li>
                </ul>

                <h4 className="font-bold text-foreground mt-4">Order Information</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Order details</li>
                  <li>Payment confirmation</li>
                  <li>Delivery information</li>
                </ul>

                <h4 className="font-bold text-foreground mt-4">Shopping Activity</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Products viewed</li>
                  <li>Items added to cart or wishlist</li>
                </ul>

                <h4 className="font-bold text-foreground mt-4">Customer Support Information</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Messages or details you send when contacting our support team</li>
                </ul>
                
                <p className="mt-4">If certain information is not provided, some features of our website may not function properly.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Information We Collect Automatically (Cookies)</h3>
                <p>We may collect certain information automatically when you visit our website, such as:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Device and browser information</li>
                  <li>IP address</li>
                  <li>Pages visited and browsing behavior</li>
                </ul>
                <p className="mt-4">This information is collected using cookies and similar technologies to improve website functionality and user experience.</p>
                <p>You may disable cookies through your browser settings, but doing so may affect some website features.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Information from Third Parties</h3>
                <p>We may receive information from trusted service providers such as:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Website hosting providers</li>
                  <li>Payment processors</li>
                  <li>Shipping partners</li>
                  <li>Analytics and marketing tools</li>
                </ul>
                <p className="mt-4">These services help us operate our business and provide services to customers.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">How We Use Your Personal Information</h3>
                
                <div>
                  <h4 className="font-bold text-foreground">Providing Products and Services</h4>
                  <p>We use your personal information to process payments, fulfill orders, manage accounts, arrange shipping, and provide customer support.</p>
                </div>

                <div>
                  <h4 className="font-bold text-foreground">Marketing and Advertising</h4>
                  <p>We may use your information to send promotional emails, marketing messages, or product updates. You may opt out of these communications at any time.</p>
                </div>

                <div>
                  <h4 className="font-bold text-foreground">Security and Fraud Prevention</h4>
                  <p>We use personal information to detect and prevent fraudulent or illegal activities and to protect our services and customers.</p>
                </div>

                <div>
                  <h4 className="font-bold text-foreground">Communication</h4>
                  <p>We may contact you regarding orders, updates, or support inquiries.</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">How We Share Personal Information</h3>
                <p>We may share your personal information with third parties in limited situations, including:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Payment processors to complete transactions</li>
                  <li>Courier partners to deliver orders</li>
                  <li>Service providers who help operate our website</li>
                  <li>Marketing or analytics partners</li>
                </ul>
                <p className="mt-4">These parties only receive the information necessary to perform their services.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">User Generated Content</h3>
                <p>Our website may allow customers to post product reviews or feedback. Any content you choose to share publicly may be visible to other users.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Third-Party Links</h3>
                <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external websites.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Children's Privacy</h3>
                <p>Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Security and Data Retention</h3>
                <p>We take reasonable measures to protect your personal information. However, no method of online transmission or storage is completely secure.</p>
                <p>We retain personal information only as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our policies.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Your Rights</h3>
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Request restriction of processing</li>
                  <li>Withdraw consent for marketing communications</li>
                </ul>
                <p className="mt-4">You may contact us to exercise these rights.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Contact Us</h3>
                <p>If you have questions about this Privacy Policy or how we handle your data, you can contact us at:</p>
                <ul className="list-none space-y-1 mt-2">
                  <li><strong className="text-foreground">Trade Name:</strong> Uncover U</li>
                <li><strong className="text-foreground">Email:</strong> thedofficial27@gmail.com</li>
                <li><strong className="text-foreground">Contact Number:</strong> +91 9303149770</li>
                <li><strong className="text-foreground">Address:</strong> 29, Shri Sampada Row House, Opposite of Baba Shri Resort, Ahead of Manushree Nagar, Indore – 452005, Madhya Pradesh, India</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Policy Updates</h3>
                <p>Uncover U reserves the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with the updated revision date.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;