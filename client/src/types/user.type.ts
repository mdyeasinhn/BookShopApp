export interface IUser {
    id?: string; // Add this if you’re using `user.id` in map
    email: string;
    name: string;
    photo: string;
    role: "admin" | "user"; // You can extend this if there are other roles
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
  }
  