import { useState } from "react";

import { Eye, EyeOff, Feather, ArrowRight, Check } from "lucide-react";

import Field from "./Field";

import PasswordStrength from "./PasswordStrength";

import { useAuth } from "../contexts/AuthContext";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",

    email: "",

    password: "",

    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitMessage, setSubmitMessage] = useState(null);

  const [authError, setAuthError] = useState(null);

  const { login, signup } = useAuth();

  const isSignup = mode === "signup";

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));

    setErrors((er) => ({ ...er, [field]: null }));

    setAuthError(null);
  };

  const validate = () => {
    const next = {};

    if (isSignup && !form.name.trim()) {
      next.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      next.password = "Password is required.";
    } else if (isSignup && form.password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }

    if (isSignup) {
      if (!form.confirmPassword) {
        next.confirmPassword = "Please confirm your password.";
      } else if (form.password !== form.confirmPassword) {
        next.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAuthError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    setSubmitMessage(null);

    // Simulate async submission

    await new Promise((resolve) => setTimeout(resolve, 1500));

    let result;

    if (isSignup) {
      result = signup(form.name, form.email, form.password);
    } else {
      result = login(form.email, form.password);
    }

    setIsSubmitting(false);

    if (result.success) {
      setSubmitMessage(
        isSignup
          ? "Account created successfully! Welcome to Marginal."
          : "Welcome back! You've been signed in.",
      );

      // Reset form after successful submission

      setForm({ name: "", email: "", password: "", confirmPassword: "" });

      // Auto-clear message after 3 seconds

      setTimeout(() => setSubmitMessage(null), 3000);
    } else {
      setAuthError(result.error);
    }
  };

  const switchMode = (next) => {
    setMode(next);

    setErrors({});

    setAuthError(null);

    setSubmitMessage(null);

    // Reset form fields that aren't shared between modes

    if (next === "login") {
      setForm((f) => ({ ...f, name: "", confirmPassword: "" }));
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F6F2EA]">
      {/* Left editorial panel */}

      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-[#1B1F23] text-[#F6F2EA] flex-col justify-between px-14 py-12">
        <FeatherMark />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-16">
            <Feather size={20} strokeWidth={1.5} className="text-[#C9A45C]" />

            <span className="tracking-[0.2em] text-xs uppercase text-[#C9A45C]">
              Marginal
            </span>
          </div>

          <h1
            className="text-[2.75rem] leading-[1.08] mb-6"

            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Write in the
            <br />
            margins of
            <br />
            your day.
          </h1>

          <p className="text-[#C7C9CC] text-[15px] leading-relaxed max-w-xs">
            A quiet place for short entries — the thought before the meeting,
            the line after the walk. Nothing to schedule, nothing to perform.
          </p>
        </div>

        <ul className="relative z-10 space-y-3 text-sm text-[#C7C9CC]">
          {[
            "No feeds. No likes. Just entries.",

            "Private by default, always.",

            "Export everything, anytime.",
          ].map((line) => (
            <li key={line} className="flex items-center gap-3">
              <Check size={14} className="text-[#C9A45C] shrink-0" />

              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* Right form panel */}

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-10 justify-center">
            <Feather size={18} strokeWidth={1.5} className="text-[#3F4B8C]" />

            <span className="tracking-[0.2em] text-xs uppercase text-[#3F4B8C]">
              Marginal
            </span>
          </div>

          {/* Mode toggle */}

          <div className="flex mb-10 border-b border-[#DDD6C8]">
            {[
              { key: "login", label: "Sign in" },

              { key: "signup", label: "Create account" },
            ].map((t) => (
              <button
                key={t.key}

                type="button"

                onClick={() => switchMode(t.key)}

                className={`relative pb-3 mr-8 text-[15px] transition-colors ${
                  mode === t.key
                    ? "text-[#1B1F23]"
                    : "text-[#9A9488] hover:text-[#1B1F23]"
                }`}

                aria-current={mode === t.key ? "page" : undefined}
              >
                {t.label}

                {mode === t.key && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#3F4B8C]" />
                )}
              </button>
            ))}
          </div>

          <h2
            className="text-2xl mb-1 text-[#1B1F23]"

            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {isSignup ? "Start your first entry" : "Welcome back"}
          </h2>

          <p className="text-sm text-[#7A7468] mb-8">
            {isSignup
              ? "Takes under a minute. No credit card."
              : "Good to see you again."}
          </p>

          {authError && (
            <div
              className="mb-6 p-3 bg-[#B0473F]/10 border border-[#B0473F] text-[#B0473F] text-sm rounded"

              role="alert"
            >
              {authError}
            </div>
          )}

          {submitMessage && (
            <div
              className="mb-6 p-3 bg-[#3F4B8C]/10 border border-[#3F4B8C] text-[#3F4B8C] text-sm rounded"

              role="status"
            >
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {isSignup && (
              <Field
                label="Name"

                type="text"

                value={form.name}

                onChange={handleChange("name")}

                error={errors.name}

                placeholder="Jamie Rivera"

                autoComplete="name"

                required
              />
            )}

            <Field
              label="Email"

              type="email"

              value={form.email}

              onChange={handleChange("email")}

              error={errors.email}

              placeholder="you@example.com"

              autoComplete="email"

              required
            />

            <div>
              <label
                htmlFor="password"

                className="block text-xs uppercase tracking-wide text-[#7A7468] mb-1.5"
              >
                Password {isSignup && <span className="text-[#B0473F]">*</span>}
              </label>

              <div className="relative">
                <input
                  id="password"

                  type={showPassword ? "text" : "password"}

                  value={form.password}

                  onChange={handleChange("password")}

                  placeholder={isSignup ? "At least 8 characters" : "••••••••"}

                  autoComplete={isSignup ? "new-password" : "current-password"}

                  aria-invalid={!!errors.password}

                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }

                  className={`w-full bg-transparent border rounded-none px-0 py-2 pr-9 text-[15px] text-[#1B1F23] placeholder-[#B7B0A2] focus:outline-none focus:border-[#3F4B8C] transition-colors ${
                    errors.password ? "border-[#B0473F]" : "border-[#DDD6C8]"
                  }`}
                />

                <button
                  type="button"

                  onClick={() => setShowPassword((s) => !s)}

                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9A9488] hover:text-[#1B1F23]"

                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {errors.password && (
                <p
                  id="password-error"

                  className="mt-1.5 text-xs text-[#B0473F] error-message"

                  role="alert"
                >
                  {errors.password}
                </p>
              )}

              {/* Password strength indicator - Stretch Goal #2 */}

              {isSignup && form.password && (
                <PasswordStrength password={form.password} />
              )}

              {!isSignup && (
                <button
                  type="button"

                  className="mt-2 text-xs text-[#3F4B8C] hover:underline focus:outline-none focus:ring-2 focus:ring-[#3F4B8C] rounded"
                >
                  Forgot password?
                </button>
              )}
            </div>

            {isSignup && (
              <div>
                <label
                  htmlFor="confirmPassword"

                  className="block text-xs uppercase tracking-wide text-[#7A7468] mb-1.5"
                >
                  Confirm Password <span className="text-[#B0473F]">*</span>
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"

                    type={showConfirmPassword ? "text" : "password"}

                    value={form.confirmPassword}

                    onChange={handleChange("confirmPassword")}

                    placeholder="Confirm your password"

                    autoComplete="new-password"

                    aria-invalid={!!errors.confirmPassword}

                    aria-describedby={
                      errors.confirmPassword
                        ? "confirmPassword-error"
                        : undefined
                    }

                    className={`w-full bg-transparent border rounded-none px-0 py-2 pr-9 text-[15px] text-[#1B1F23] placeholder-[#B7B0A2] focus:outline-none focus:border-[#3F4B8C] transition-colors ${
                      errors.confirmPassword
                        ? "border-[#B0473F]"
                        : "border-[#DDD6C8]"
                    }`}
                  />

                  <button
                    type="button"

                    onClick={() => setShowConfirmPassword((s) => !s)}

                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9A9488] hover:text-[#1B1F23]"

                    aria-label={
                      showConfirmPassword
                        ? "Hide confirmation password"
                        : "Show confirmation password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p
                    id="confirmPassword-error"

                    className="mt-1.5 text-xs text-[#B0473F] error-message"

                    role="alert"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"

              disabled={isSubmitting}

              className={`w-full mt-2 bg-[#1B1F23] text-[#F6F2EA] text-[15px] py-3 flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3F4B8C] focus:ring-offset-2 focus:ring-offset-[#F6F2EA] ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#3F4B8C]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" />

                  {isSignup ? "Creating account..." : "Signing in..."}
                </>
              ) : (
                <>
                  {isSignup ? "Create account" : "Sign in"}

                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#7A7468]">
            {isSignup ? "Already keeping notes with us?" : "New to Marginal?"}{" "}
            <button
              type="button"

              onClick={() => switchMode(isSignup ? "login" : "signup")}

              className="text-[#3F4B8C] hover:underline focus:outline-none focus:ring-2 focus:ring-[#3F4B8C] rounded"
            >
              {isSignup ? "Sign in" : "Create an account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Signature element: a single continuous line, like a pen never lifted —

// echoes the "marginal notes" concept as faint background linework.

function FeatherMark() {
  return (
    <svg
      className="absolute -right-24 -top-16 opacity-[0.07] pointer-events-none"

      width="520"

      height="520"

      viewBox="0 0 520 520"

      fill="none"
    >
      <path
        d="M40 460 C 160 400, 120 260, 220 220 C 320 180, 300 60, 460 40"

        stroke="#F6F2EA"

        strokeWidth="1.5"
      />

      <path
        d="M80 480 C 200 420, 160 280, 260 240 C 360 200, 340 80, 500 60"

        stroke="#F6F2EA"

        strokeWidth="1.5"
      />
    </svg>
  );
}
