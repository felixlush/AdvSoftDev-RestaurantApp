<p align="center">
    <img src="/public/logoNew.webp" height="96">
    <h1 align="center">Taco's 2 U - Restaurant Web Application</h1>
</p>

<p align="center">
    <strong>A modern, full-stack restaurant web application built with Next.js 13</strong>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/Next.js-13.4.3-black?style=flat-square&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/TypeScript-5.0.4-blue?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind-3.3.2-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel" alt="Vercel">
</p>

## 🌮 About

Taco's 2 U is a comprehensive restaurant web application showcasing modern web development practices. Built as part of an Advanced Software Design course, it demonstrates full-stack development with Next.js, secure authentication, payment processing, and administrative features.

## ✨ Features

### 🏠 **Customer Experience**
- **Home Page**: Hero banner with featured menu items and restaurant highlights
- **Menu Management**: Browse menu with search functionality and category filtering
- **Interactive Maps**: Google Maps integration showing restaurant locations in Sydney
- **Shopping Cart**: Add items, modify quantities, and proceed to checkout
- **Secure Checkout**: Session validation with pre-filled user information
- **Order Tracking**: View order history and status updates

### 🔐 **Authentication & Security**
- User registration and login system
- Password encryption using bcrypt
- JWT-based session management
- Input validation and sanitization
- Protected routes with middleware

### 👤 **User Dashboard**
- Account management and profile editing
- Order history with detailed views
- Payment method management
- Personal information updates

### 🛠️ **Admin Panel**
- User management (CRUD operations)
- Menu item management (add, edit, delete items)
- Order management and status updates
- Administrative analytics and insights

## 🚀 Tech Stack

**Frontend:**
- [Next.js 13](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Icons](https://react-icons.github.io/react-icons/) for UI icons

**Backend:**
- Next.js API Routes
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) for database
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing

**DevOps & Testing:**
- [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) for CI/CD
- [Jest](https://jestjs.io/) for testing
- [Vercel](https://vercel.com/) for deployment
- Automated testing and build pipelines

**APIs & Services:**
- Google Maps API for location services
- RESTful API architecture

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- PostgreSQL database (or Vercel Postgres)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-flask
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   POSTGRES_URL=your_postgres_connection_string
   POSTGRES_PRISMA_URL=your_prisma_connection_string
   POSTGRES_URL_NO_SSL=your_no_ssl_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Visit the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

For CI/CD testing:
```bash
npm run test:ci
```

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🔑 Admin Access

To access the admin panel features, use the following credentials:

**Email:** `felix.lush-test@gmail.com`  
**Password:** `password`

> ⚠️ **Note**: These are demo credentials for testing purposes only.

## 🏗️ Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   ├── ui/               # UI-specific components
│   └── lib/              # Utilities and configurations
├── public/               # Static assets
├── _tests_/             # Test files
└── azure-pipelines.yml  # CI/CD configuration
```

## 🚀 Deployment

The application is automatically deployed to Vercel through the CI/CD pipeline. The deployment process includes:

1. **Automated Testing**: Jest test suite runs on every push
2. **Build Process**: Next.js build with optimization
3. **Deployment**: Automatic deployment to Vercel on successful builds

## 🤝 Contributing

This is an academic project, but contributions and suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of an academic assignment for Advanced Software Design coursework.

## 🙏 Acknowledgments

- Advanced Software Design Course
- Next.js team for the excellent framework
- Vercel for hosting and database services
- Google Maps API for location services

---

<p align="center">Made with ❤️ for Advanced Software Design</p>


