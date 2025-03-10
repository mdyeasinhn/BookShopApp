import { Router } from 'express';
import userRoutes from '../module/User/user.route';
import authRouter from '../module/auth/auth.route';
import bookRoutes from '../module/Book/book.route';
import orderRoutes from '../module/order/order.route';




const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
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
    path: '/books',
    route: bookRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;