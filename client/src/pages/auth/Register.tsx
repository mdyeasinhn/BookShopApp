import { useState } from "react";
import { User, Mail, Lock, Image, UserPlus, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

type RegisterForm = {
  name: string;
  photo: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    photo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterForm> = {};

    if (!formData.name) newErrors.name = "Name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.photo) newErrors.photo = "Photo URL is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const userInfo = {
        name: data.name,
        photo: data.photo,
        email: data.email,
        password: data.password,
      };

      const res = await registerUser(userInfo).unwrap();
      if (res.data) {
        toast.success("User Created Successfully");
        navigate("/login");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred while signing up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await onSubmit(formData);
  };

  const handleInputChange = (field: keyof RegisterForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6 p-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-400 to-rose-500 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-xl text-rose-800 leading-relaxed">
                Sign up to join our community and start your journey!
              </p>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Professional workspace"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-100/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-400 to-rose-500 rounded-2xl mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-rose-900 mb-2">Create Account</h2>
              <p className="text-rose-700">Sign up to join our community</p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-rose-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-colors ${
                      errors.name
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-rose-100"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Photo URL Field */}
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Photo URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image className="h-5 w-5 text-rose-400" />
                  </div>
                  <input
                    type="url"
                    value={formData.photo}
                    onChange={(e) => handleInputChange("photo", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-colors ${
                      errors.photo
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-rose-100"
                    }`}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-rose-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-colors ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-rose-100"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-rose-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-colors ${
                      errors.password
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-rose-100"
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-rose-400 hover:text-rose-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-rose-400 hover:text-rose-600" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-rose-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-colors ${
                      errors.confirmPassword
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-rose-100"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-rose-400 hover:text-rose-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-rose-400 hover:text-rose-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="mt-6 pt-6 border-t border-rose-100 text-center">
                <p className="text-rose-700 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-rose-600 hover:text-rose-800 font-semibold hover:underline transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;