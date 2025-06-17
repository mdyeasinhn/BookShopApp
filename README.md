# 📚 Bookory - Bookshop Management System

**Bookory** is a modern Bookshop Management System that helps bookstores manage inventory, sales, and customer interactions. Built with a full-stack architecture, it ensures smooth and efficient operation for both administrators and customers.

---

## 1️⃣ Features

- 📘 **Book Management** – Add, update, and delete books with details like title, author, price, and category.
- 🛒 **Shopping Experience** – Users can browse, search, and order books easily.
- 🧾 **Order Tracking** – View customer orders, status updates, and invoices.
- 👥 **User Roles** – Secure authentication with role-based access (Admin/User).
- 📊 **Admin Dashboard** – Visual reports of sales, inventory, and user activity.
- 💬 **Responsive UI** – Clean and optimized for desktop and mobile use.

---

## 2️⃣ Tech Stack

| Layer        | Technology           |
|--------------|----------------------|
| Frontend     | React.js, Tailwind CSS |
| Backend      | Node.js, Express.js   |
| Database     | MongoDB, Mongoose     |
| Authentication | JWT (JSON Web Token) |
| Routing      | React Router          |

---

## 3️⃣ Installation & Setup

### 🔧 Prerequisites

- Node.js & npm installed
- MongoDB Atlas or local MongoDB

### 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/bookory.git
cd bookory

2. **Install dependencies**
# Frontend
cd client
npm install

# Backend
cd ../server
npm install

3. **Configure environment variables**
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

4. **Run the app**
# Start backend
cd server
npm run dev

# Start frontend (in another terminal)
cd ../client
npm run dev
