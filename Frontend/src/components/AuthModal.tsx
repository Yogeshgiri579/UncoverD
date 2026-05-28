import { FormEvent, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: (token: string) => void;
}

const AuthModal = ({ open, onClose, onAuthSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Reset form fields when switching between signin / signup
  const switchMode = (next: "signin" | "signup") => {
    setMode(next);
    setEmail(""); setPassword(""); setFirstName(""); setLastName("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (mode === "signup") {
        if (!firstName.trim()) throw new Error("Please enter your first name");
        if (!lastName.trim()) throw new Error("Please enter your last name");
        if (!email.trim()) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        const response = await apiRequest("/auth/register", {
          method: "POST",
          body: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password,
          },
        });

        onAuthSuccess(response.token);
        onClose();
        toast.success("Account created! You are now signed in.");
        return;
      }

      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: { email, password },
      });

      onAuthSuccess(response.token);
      onClose();
      toast.success("Login successful.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md glass-card rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold tracking-wide">
                {mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
              </h2>
              <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1 w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1 w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold tracking-wider text-sm hover:bg-primary/90 transition-colors">
                {mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                className="text-primary hover:underline font-medium"
              >
                {mode === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
