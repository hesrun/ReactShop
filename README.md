# 🛍️ ReactShop

Modern e-commerce platform built with React, TypeScript, and Supabase. A fully-featured online store with product catalog, shopping cart, favorites, user authentication, and order management.

**[🌐 Live Demo](https://hesshop.vercel.app/)**

---

## ✨ Features

### 🔐 Authentication & User Management

-   User registration and login
-   Protected routes with role-based access
-   Secure session management with Supabase Auth
-   User account management

### 🛒 Shopping Experience

-   **Dynamic Product Catalog** with advanced filtering by category
-   **Product Search** with real-time results
-   **Wishlist/Favorites** system with persistent storage
-   **Shopping Cart** with quantity management
-   Price calculations with **discount percentages**
-   Responsive product cards with hover effects

### 📦 Order Management

-   Complete checkout flow with address validation
-   Multiple delivery methods selection
-   Order history and order tracking
-   Order status monitoring
-   Email notifications for order confirmations

### 💳 Addresses Management

-   Add and manage multiple delivery addresses
-   Address validation
-   Quick address selection during checkout
-   Edit/delete addresses

### 🎨 UI/UX

-   Responsive design (mobile, tablet, desktop)
-   Loading skeletons for better UX
-   Toast notifications
-   Modal dialogs for actions
-   Dark mode ready with Tailwind CSS

### ⚡ Performance

-   Lazy loading components
-   Optimized state management with MobX
-   Efficient data fetching
-   Image optimization

---

## 🚀 Tech Stack

### Frontend

-   **React 19** - UI framework
-   **TypeScript** - Type safety
-   **Vite** - Lightning-fast build tool
-   **Tailwind CSS** - Utility-first styling
-   **React Router** - Client-side routing

### State Management & Data

-   **MobX** - Reactive state management
-   **Supabase** - Backend as a Service (Auth, Database, Storage)
-   **React Query patterns** - Data fetching with custom hooks

### Features & Libraries

-   **React Toastify** - Toast notifications
-   **Lucide React** - Beautiful icons

### Email Service

-   **Resend** - Transactional email delivery for order confirmations

### Infrastructure & Deployment

-   **Vercel** - Hosting and CI/CD
-   **Supabase** - PostgreSQL database and authentication
-   **Deno** - Serverless functions for order emails via Resend

---

## 📋 Project Structure

```
src/
├── api/               # Supabase configuration
├── assets/            # Static assets
├── components/        # Reusable UI components
│   ├── common/        # Feature-specific components
│   │   ├── addresses/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── category/
│   │   ├── header/
│   │   ├── order/
│   │   └── orders/
│   ├── layout/        # Layout components
│   ├── protectedRoutes/  # Authentication guards
│   ├── skeletons/     # Loading skeletons
│   └── ui/            # Basic UI components
├── constants/         # Application constants
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── routes/            # Route definitions
├── store/             # MobX stores
│   ├── addressStore
│   ├── cartStore
│   ├── favoriteStore
│   ├── loadingStore
│   ├── modalStore
│   ├── ordersStore
│   └── userStore
├── types/             # TypeScript types
└── utils/             # Helper functions
```

---

## 🎯 Key Functionalities

### State Management with MobX

-   **User Store** - Authentication state, user data
-   **Cart Store** - Shopping cart management with persistence
-   **Favorite Store** - Wishlist functionality
-   **Address Store** - User addresses management
-   **Orders Store** - Order history and details
-   **Modal Store** - Modal dialogs state
-   **Loading Store** - Global loading state

### Custom Hooks

-   `useFetch()` - Data fetching with loading/error states
-   `useSendOrderEmail()` - Order confirmation email sending

### Serverless Functions (Deno)

-   `send-order` - Email notifications for new orders via Supabase Functions + Resend integration

---

## 🎯 Roadmap & Future Features

### Coming Soon

-   🔐 **Admin Dashboard** - Order management, product management, analytics
-   📊 **Admin Role** - User role-based access control (Customer, Admin)
-   📈 **Analytics Dashboard** - Sales reports, user metrics
-   🛍️ **Wishlist Sharing** - Share favorites with friends
-   💳 **Payment Integration** - Stripe/PayPal integration
-   📦 **Inventory Management** - Stock tracking for admin
-   🌍 **Multi-language Support** - i18n implementation

### Current Limitations

-   ⚠️ Admin dashboard is not yet implemented (user-facing features only)
-   ⚠️ Role-based access control (RBAC) pending implementation

---

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   Supabase account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ReactShop.git
cd ReactShop
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

---

## 📱 Core Pages

-   **Main** - Homepage with featured products
-   **Category** - Products filtered by category
-   **Product** - Detailed product information
-   **Cart** - Shopping cart with checkout flow
-   **Favorites** - Wishlist management
-   **Addresses** - User address management
-   **Orders** - Order history and tracking
-   **Order** - Individual order details
-   **Account** - User profile management
-   **Auth** - Login/Registration pages

---

## 🔗 API Integration

-   **DummyJSON API** - Product data source
-   **Supabase Database** - User data, orders, addresses, favorites
-   **Supabase Auth** - User authentication
-   **Supabase Functions** - Email notifications

---

## 🎨 Design Features

-   Clean, modern UI with Tailwind CSS
-   Consistent component library
-   Responsive grid layouts
-   Smooth transitions and animations
-   Professional color scheme with sky/blue accents
-   Loading states with skeleton screens

---

## 🔒 Security

-   Protected authentication routes
-   Secure session management
-   SQL injection prevention via Supabase
-   Type-safe API calls with TypeScript
-   Environment variable protection

---

## 📊 Performance Optimizations

-   Code splitting with React Router
-   Lazy loading components
-   Optimized bundle size with Vite
-   Efficient state updates with MobX
-   Image lazy loading
-   CSS minification with Tailwind

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Vlad** - Full Stack Developer

-   Live Demo: [hesshop.vercel.app](https://hesshop.vercel.app/)

---

## 📞 Support

For support, please open an issue on GitHub or contact via email.

---

**Made with ❤️ using React & TypeScript**
