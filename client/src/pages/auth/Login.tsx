import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";

// Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormType = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  // Move useForm inside the component
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    console.log("Login Data:", data);
    const toastId = toast.loading("Logging in...");
  
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
  
      const res = await login(userInfo).unwrap();
      console.log("API Response:", res);
  
      if (res?.data?.token) {
        const user = verifyToken(res.data.token) as TUser;
        console.log("Decoded User:", user);
  
        dispatch(setUser({ user, token: res.data.token }));
        toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
        navigate("/");
      } else {
        throw new Error(" token not found in response.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };
  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6  w-[400px] mx-auto p-6  shadow-xl rounded-xl"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Login</h2>
          <p>Enter your email below to log in to your account.</p>
        </div>

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-xl bg-rose-500 hover:bg-rose-400">
          Login
        </Button>

        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link to="/register" className="hover:underline hover:text-black text-gray-600">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
