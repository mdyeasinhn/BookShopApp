import { Router } from 'express';
import userRoutes from '../module/User/user.route';
import blogRoutes from '../module/Blog/blog.route';
import authRouter from '../module/auth/auth.route';




const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/admin/users',
    route: userRoutes,
  },
  {
    path: '/admin/blogs',
    route: blogRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;