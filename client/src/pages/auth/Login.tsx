import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@mui/material";
import { Input } from "@mui/material";
import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    const toastId = toast.loading("Logging in...");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      if (res?.data?.token) {
        const user = verifyToken(res.data.token) as TUser;
        dispatch(setUser({ user, token: res.data.token }));
        toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
        navigate("/");
      } else {
        throw new Error("Token not found in response.");
      }
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh", justifyContent: "center", alignItems: "center", backgroundColor: "#1c1e2a" }}>
      <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src="https://source.unsplash.com/1600x900/?nature,forest" // Use a dynamic gif link or your own
              alt="background"
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          </Box>
        </motion.div>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            backgroundColor: "#2c2f3d",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h4" sx={{ marginBottom: "20px", color: "#fff", fontWeight: "bold" }}>
              Welcome to Vuexy! 👋
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "40px", color: "#b3b3b3" }}>
              Please sign-in to your account and start the adventure
            </Typography>
          </motion.div>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box sx={{ marginBottom: "20px" }}>
              <Input
                fullWidth
                placeholder="Email"
                type="email"
                {...form.register("email")}
                sx={{
                  backgroundColor: "#3c4048",
                  padding: "10px",
                  borderRadius: "5px",
                  color: "white",
                  "&:focus": { outline: "none" },
                }}
              />
            </Box>

            <Box sx={{ marginBottom: "30px" }}>
              <Input
                fullWidth
                placeholder="Password"
                type="password"
                {...form.register("password")}
                sx={{
                  backgroundColor: "#3c4048",
                  padding: "10px",
                  borderRadius: "5px",
                  color: "white",
                  "&:focus": { outline: "none" },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  width: "48%",
                  borderRadius: "5px",
                  padding: "10px 0",
                  backgroundColor: "#6c5ce7",
                  "&:hover": { backgroundColor: "#5e4bd2" },
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  width: "48%",
                  borderRadius: "5px",
                  padding: "10px 0",
                }}
              >
                Forgot Password?
              </Button>
            </Box>

            <Typography variant="body2" sx={{ textAlign: "center", color: "#b3b3b3" }}>
              Don't have an account yet?{" "}
              
              <a href="/register" style={{ textDecoration: "underline", color: "#6c5ce7" }}>
                Register
              </a>
            </Typography>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
