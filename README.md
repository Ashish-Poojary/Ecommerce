# Ecommerce Platform

A full-stack e-commerce web application built with React and Node.js. Users can browse products, add items to cart, and make payments. Admins can manage products, categories, orders, and view customer feedback.

## Features

- User authentication (login/signup)
- Product browsing and search
- Shopping cart functionality
- Razorpay payment integration
- Order management
- Admin dashboard with statistics
- Product and category management
- Customer feedback system
- Password reset via OTP email

## Tech Stack

**Frontend:**
- React.js
- Bootstrap 5
- Axios
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MySQL
- Multer (file uploads)
- Nodemailer (email sending)
- Razorpay (payments)

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/Ecommerce.git
cd Ecommerce
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

## Configuration

1. Create a `.env` file in the `server` folder:
```env
PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_NAME=internship_mca
DB_USER=root
DB_PASSWORD=your_password

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

2. Create a `.env` file in the `client` folder:
```env
REACT_APP_RAZORPAY_KEY=your_razorpay_key
REACT_APP_RAZORPAY_SECRET=your_razorpay_secret
REACT_APP_API_URL=http://localhost:3001
```

3. Set up MySQL database and import the schema from `database/customer_orders.sql`

## Running the Application

1. Start the server:
```bash
cd server
npm start
```

2. Start the client (in a new terminal):
```bash
cd client
npm start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
Ecommerce/
├── client/          # React frontend
├── server/          # Node.js backend
├── database/        # SQL schema files
└── README.md
```

## Default Credentials

- Admin: Use the admin account created in your database
- Users: Register through the signup page

## Notes

- Make sure MySQL is running before starting the server
- For email functionality, use Gmail App Password (not regular password)
- Razorpay keys should be from your Razorpay test/live account

