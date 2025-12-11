# Ecommerce - Online Shopping Platform

Ecommerce is a full-stack web-based online shopping platform that provides a complete e-commerce solution with user authentication, product management, shopping cart, payment integration, and admin dashboard.

## Features

### For Customers
- **User Registration & Authentication**: Secure user registration and login system
- **Product Browsing**: Browse products by category with search functionality
- **Shopping Cart**: Add products to cart and manage orders
- **Order Management**: View order history (pending and confirmed orders)
- **Payment Integration**: Secure payment processing via Razorpay
- **Profile Management**: Update user profile and view order details
- **Password Recovery**: Forgot password functionality with OTP verification via email

### For Administrators
- **Admin Dashboard**: Comprehensive dashboard with statistics (Total Users, Products, Orders, Revenue)
- **Product Management**: Add, view, and delete products with image uploads
- **Category Management**: Create and manage product categories
- **Order Management**: View all customer orders with filtering options (All, Pending, Confirmed)
- **User Management**: View registered users and their details
- **Feedback Management**: View and manage customer feedback
- **Customer Address Access**: View customer addresses for paid orders

## Technology Stack

### Frontend
- **React.js** (v18.3.1) - UI framework
- **React Router DOM** (v7.0.2) - Routing
- **Bootstrap 5** (v5.3.3) - CSS framework
- **Axios** (v1.7.9) - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v4.21.2) - Web framework
- **MySQL** (v2.18.1) - Database
- **Multer** (v1.4.5) - File upload handling
- **Nodemailer** (v6.9.16) - Email service
- **CORS** (v2.8.5) - Cross-origin resource sharing

### Payment Gateway
- **Razorpay** - Payment processing

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

### Setup Database

1. Create a MySQL database:
   ```sql
   CREATE DATABASE internship_mca;
   ```

2. Update database credentials in `server/index.js`:
   ```javascript
   const conn = mysql.createConnection({
       host: 'localhost',
       port: '3306',
       database: 'internship_mca',
       user: 'root',
       password: 'your_password'
   });
   ```

3. Import the database schema (create tables manually or use phpMyAdmin):
   - `signup` - User registration data
   - `login` - User authentication
   - `products` - Product information
   - `category` - Product categories
   - `customer_orders` - Order details
   - `payment` - Payment transactions
   - `feedback` - Customer feedback
   - `otp` - OTP verification

### Configure Email Settings

Update email configuration in `server/index.js`:
```javascript
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password",
    },
});
```

**Note**: For Gmail, you need to generate an App Password from your Google Account settings.

### Configure Razorpay

Update Razorpay keys in `client/src/components/PayBillNext.js`:
```javascript
const options = {
    key: "your_razorpay_key",
    key_secret: "your_razorpay_secret",
    // ...
};
```

### Install Dependencies

1. **Install Server Dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Install Client Dependencies**:
   ```bash
   cd client
   npm install
   ```

### Run the Application

1. **Start the Server**:
   ```bash
   cd server
   npm start
   ```
   Server will run on `http://localhost:3001`

2. **Start the Client** (in a new terminal):
   ```bash
   cd client
   npm start
   ```
   Client will run on `http://localhost:3000`

3. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`
   - The application will automatically open in your default browser

## Project Structure

```
Ecommerce/
├── client/                 # React frontend application
│   ├── public/            # Static files
│   │   ├── upload/        # Product images
│   │   └── ...
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Layouts/   # Navbar, Footer
│   │   │   ├── Adminhome.js
│   │   │   ├── Category.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── MyCart.js
│   │   │   ├── Orders.js
│   │   │   ├── Product.js
│   │   │   ├── Signup.js
│   │   │   └── ...
│   │   ├── images/        # Static images
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── ...
├── server/                # Node.js backend
│   ├── index.js          # Main server file
│   ├── package.json
│   └── ...
├── database/             # Database files
│   └── customer_orders.sql
├── .gitignore
└── README.md
```

## API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /log_auth` - User login
- `POST /forgotpass` - Send OTP for password reset
- `POST /otp` - Verify OTP
- `POST /resetpass` - Reset password

### Products
- `GET /productview` - Get all products
- `POST /product` - Add new product (admin)
- `DELETE /delproduct/:id` - Delete product (admin)

### Categories
- `GET /viewcategory` - Get all categories
- `POST /category` - Add new category (admin)
- `DELETE /delcategory/:id` - Delete category (admin)

### Orders
- `GET /mycart/:uid` - Get user orders
- `POST /addcart/:id/:uid` - Add product to cart
- `DELETE /deleteorder/:id` - Remove order from cart
- `GET /orders` - Get all orders (admin)

### Payment
- `POST /paybillnext/:price` - Process payment

### Admin
- `GET /admin/stats` - Get dashboard statistics
- `GET /user/name/:email` - Get user name by email
- `GET /user/address/:email` - Get user address by email

### Feedback
- `GET /viewfeedback` - Get all feedback (admin)
- `POST /feedback` - Submit feedback

## Default User Types

### Admin
- Access admin dashboard
- Manage products, categories, and orders
- View all users and feedback

### User
- Browse and purchase products
- Manage cart and orders
- Submit feedback

## Security Notes

- **Never commit sensitive files** like database credentials or API keys to version control
- **Use environment variables** for sensitive configuration (consider using `.env` files)
- **Validate and sanitize** all user inputs
- **Use strong passwords** for database and email accounts
- **Keep dependencies updated** to avoid security vulnerabilities
- **Implement proper authentication** and authorization checks
- **Use HTTPS** in production environment

## Features in Detail

### Shopping Cart
- Add multiple products to cart
- View pending and confirmed orders
- Calculate total only for pending orders
- Remove pending orders before payment
- Proceed to payment for pending orders

### Payment Processing
- Integrated with Razorpay payment gateway
- Secure payment processing
- Automatic order status update after successful payment
- Payment confirmation via email

### Admin Dashboard
- Real-time statistics:
  - Total Users
  - Total Products
  - Total Orders
  - Total Revenue
- Order management with filtering
- User and product management

## Development

### Available Scripts

**Client:**
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

**Server:**
- `npm start` - Start server
- `npm run devStart` - Start server with nodemon (auto-restart)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is for educational/demonstration purposes.

## Support

For issues or questions, please contact the development team or create an issue in the repository.

## Acknowledgments

- Bootstrap for UI components
- Razorpay for payment gateway integration
- React team for the amazing framework
- Node.js and Express.js communities

---

**Note**: This is a development project. For production use, ensure proper security measures, error handling, and testing are implemented.

