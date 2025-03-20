import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  photo: z.string().url({ message: "Enter a valid photo URL." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  
  const onSubmit = async (data: RegisterForm) => {
    const userInfo = {
      name: data.name,
      photo: data.photo,
      email: data.email,
      password: data.password,
    };
  
    try {
      const res = await registerUser(userInfo).unwrap();
      console.log("API Response:", res); // Check the full API response here
  
      if (res.data) {
        toast.success("User Created Successfully");
        navigate("/login");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred while signing up");
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[400px] mx-auto p-6 border rounded-xl shadow-xl">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold ">Create an Acount</h2>
          <h2 className="">Enter your email below to create your account</h2>
        </div>

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Photo Field */}

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter your photoUrl" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button type="submit" className="w-full rounded-xl bg-rose-500 hover:bg-rose-400">Create Account</Button>

        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link to="/login" className="hover:underline hover:text-black text-gray-600">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
