# E-Commerce React App

This is a simple e-commerce web application built with **React**, **Redux Toolkit**, and **Firebase authentication**. Users can browse products, add them to the cart, and place orders. Dark mode and user login/logout features are included.

---

## 📸 Screenshot

![E-Commerce App Screenshot](src/screenshot.png)

---

## ⚡ Features

- Browse products fetched from a fake API
- Product details page
- Add/remove products from the cart
- Place orders with address and Cash on Delivery
- User authentication (signup/login/logout)
- Protected routes (cart, orders, profile)
- Dark mode toggle

---

## 💻 Getting Started (Local Development)

Follow these steps to run the project locally:

1. **Clone the repository**  
```bash
git clone https://github.com/Naveenpyla/shoppingApp.git
Navigate to the project folder

bash
Copy code
cd ecommerce-app
Install dependencies

bash
Copy code
npm install
Start the development server

bash
Copy code
npm start
Open your browser at:

arduino
Copy code
http://localhost:3000
⚠️ Note: The app runs locally on your machine. localhost:3000 will not work on GitHub.

🔧 Project Structure
csharp
Copy code
ecommerce-app/
├── public/
├── src/
│   ├── components/       # Navbar, ProductCard, ProtectedRoute, etc.
│   ├── context/          # AuthContext, ThemeContext
│   ├── pages/            # Home, ProductDetails, Cart, Profile, Orders, Login, Signup
│   ├── slices/           # Redux slices (products, cart)
│   ├── App.js
│   └── index.js
├── package.json
├── package-lock.json
└── README.md
🔗 Dependencies
React

Redux Toolkit

React Router DOM

Firebase

Material UI
