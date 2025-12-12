# Ecommerce Platform

This is a full-stack e-commerce web application I built using React for the frontend and Node.js with Express for the backend. It's a complete shopping platform where users can browse products, add them to cart, and make payments. There's also an admin panel to manage everything.

## What's Inside

**For Users:**
- Sign up and login
- Browse products with search functionality
- Add products to cart
- Make payments using Razorpay
- View order history
- Submit feedback

**For Admins:**
- Dashboard with stats (users, products, orders, revenue)
- Add/edit/delete products
- Manage categories
- View all customer orders
- See customer feedback
- View registered users

## Tech Used

**Frontend:**
- React.js
- Bootstrap 5 for styling
- Axios for API calls
- React Router for navigation

**Backend:**
- Node.js with Express
- MySQL database
- Multer for handling image uploads
- Nodemailer for sending OTP emails
- Razorpay integration for payments

## Setup Instructions

### Prerequisites
Make sure you have Node.js and MySQL installed on your system.

### Step 1: Clone the repo
```bash
git clone https://github.com/your-username/Ecommerce.git
cd Ecommerce
```

### Step 2: Install dependencies

For the server:
```bash
cd server
npm install
```

For the client:
```bash
cd ../client
npm install
```

### Step 3: Database setup

Create a MySQL database and import the schema. You'll need to create tables for:
- users (signup table)
- login
- products
- category
- customer_orders
- feedback
- otp

The exact schema depends on your requirements, but the main tables are there.

### Step 4: Environment variables

Create a `.env` file in the `server` folder:
```env
PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=root
DB_PASSWORD=your_password

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Create a `.env` file in the `client` folder:
```env
REACT_APP_RAZORPAY_KEY=your_razorpay_key
REACT_APP_RAZORPAY_SECRET=your_razorpay_secret
REACT_APP_API_URL=http://localhost:3001
```

**Important:** 
- For Gmail, you need to use an App Password, not your regular password. Enable 2FA and generate an app password from your Google account settings.
- Get your Razorpay keys from the Razorpay dashboard (test keys for development, live keys for production).

### Step 5: Run the application

Start the server first:
```bash
cd server
npm start
```

Then start the client (in a new terminal):
```bash
cd client
npm start
```

The app should open at `http://localhost:3000`

## Project Structure

```
Ecommerce/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/    # All React components
│   │   └── images/        # Image assets
│   └── public/
├── server/          # Node.js backend
│   └── index.js     # Main server file with all routes
└── README.md
```

## Default Setup

You'll need to create an admin account in your database. The login system checks the `login` table for authentication. Make sure to add at least one admin user with `utype='admin'` in the login table.

## Notes

- The server runs on port 3001 by default
- The client runs on port 3000
- Make sure MySQL is running before starting the server
- Image uploads are stored in `client/public/upload/`
- Payment integration uses Razorpay test mode by default (change to live keys for production)

## Issues?

If you face any issues:
1. Make sure all environment variables are set correctly
2. Check if MySQL is running
3. Verify database connection details
4. For email issues, double-check your Gmail app password

That's pretty much it. Feel free to customize it according to your needs!

