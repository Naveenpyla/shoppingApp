# E-commerce App

A fully functional e-commerce website built with **React**, **Redux Toolkit**, **Firebase Authentication**, and **Material-UI**.

---

## Live Demo

Check out the live website here: [E-commerce App Live](https://Naveenpyla.github.io/shoppingApp)

---

## Screenshot

![E-commerce App Screenshot](src/screenshot.png)  

---

## Features

- Browse products from a fake API
- Search and filter products
- Add products to cart
- Place and cancel orders
- View order history
- User authentication (login, signup, logout)
- Dark/Light mode toggle
- Responsive design

---

## Getting Started Locally

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Naveenpyla/shoppingApp.git
cd shoppingApp
Install dependencies:

bash
Copy code
npm install
Run the project:

bash
Copy code
npm start
The app will run on http://localhost:3000.

Folder Structure
php
Copy code
ecommerce-app/
├── public/
├── src/
│   ├── components/       # Navbar, ProductCard, ProtectedRoute, etc.
│   ├── pages/            # Home, ProductDetails, Cart, Login, Signup, Profile, Orders
│   ├── slices/           # Redux slices (products, cart)
│   ├── context/          # Theme and Auth context
│   ├── App.js
│   ├── index.js
│   └── screenshot.png    # Project screenshot
├── package.json
└── README.md
Deployment
This project is deployed on GitHub Pages. To deploy:

bash
Copy code
npm run build
npm run deploy
