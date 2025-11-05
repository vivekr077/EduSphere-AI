# EduSphere AI 🎓

EduSphere AI is a modern educational platform that leverages artificial intelligence to enhance learning experiences. Built with Next.js and powered by Gemini AI, it offers personalized learning paths, interactive content, and smart tutoring capabilities.

## 🌟 Features

- **AI-Powered Learning**: Utilizes Gemini AI for intelligent tutoring and content generation
- **Personalized Learning Paths**: Customized educational journeys for each student
- **Subscription System**: Integrated with Stripe for seamless payment processing
- **Secure Authentication**: Powered by Clerk for robust user management
- **Real-time Updates**: Using Inngest for event handling and notifications
- **Responsive Design**: Built with modern UI components and TailwindCSS

## 🚀 Tech Stack

- **Framework**: Next.js 14
- **Database**: PostgreSQL (Neon)
- **Authentication**: Clerk
- **Payment Processing**: Stripe
- **AI Integration**: Google Gemini AI
- **Event Processing**: Inngest
- **Styling**: TailwindCSS
- **Language**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn or pnpm
- PostgreSQL database

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/edusphere-ai.git
   cd edusphere-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   - Copy the `.env.example` file to `.env`
   ```bash
   cp .env.example .env
   ```
   - Fill in the required environment variables in `.env`

4. **Database Setup**
   - Ensure your PostgreSQL database is running
   - Update the `DATABASE_URL` in your `.env` file
   - Run migrations:
   ```bash
   npm run db:migrate
   # or
   yarn db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## 🔧 Configuration

The project uses several configuration files:
- `next.config.mjs`: Next.js configuration
- `tailwind.config.ts`: TailwindCSS styling configuration
- `drizzle.config.js`: Database ORM configuration
- `components.json`: UI components configuration

## ⚙️ Environment Variables Reference

### Overview
This section provides detailed information about all environment variables required to run EduSphere AI. Create a `.env` file in the root directory and configure these variables according to your setup.

### Variable Categories

#### 🌐 Application Settings
```env
# Base URL for the application
HOST_URL=http://localhost:3000
```

#### 🤖 Gemini AI Integration
```env
# API key for Google's Gemini AI services
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

#### 💳 Stripe Payment System
```env
# Stripe subscription price IDs
NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY=your_yearly_price_id
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLT=your_monthly_price_id

# Stripe API credentials
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEB_HOOK_KEY=1  # Default webhook key
```

#### 🔄 Inngest Event Processing
```env
# Inngest service credentials
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_EVENT_KEY=your_inngest_event_key
```

#### 🗄️ Database Configuration
```env
# PostgreSQL connection string (Neon)
NEXT_PUBLIC_DATABASE_URL=your_postgresql_connection_string
```

#### 🔐 Clerk Authentication
```env
# Clerk API keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Authentication routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in  # Default auth route
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up  # Default auth route
```

### Setup Instructions
1. Create a new file named `.env` in the project root
2. Copy the variables from `.env.example`
3. Replace placeholder values with actual credentials
4. Never commit the `.env` file to version control
5. Update values based on environment (development/production)

## 🌐 Deployment

The project uses several configuration files:
- `next.config.mjs`: Next.js configuration
- `tailwind.config.ts`: TailwindCSS styling configuration
- `drizzle.config.js`: Database ORM configuration
- `components.json`: UI components configuration

## 🌐 Deployment

The application can be deployed using Vercel:

1. Push your code to a Git repository
2. Import your project to Vercel
3. Set up the required environment variables
4. Deploy!

For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you have any questions or need support, please open an issue in the repository.

---

Built with ❤️ using Next.js and AI
