# 🛍️ Stitch & Spark — Advanced React E‑Commerce Web App
A modern, full‑stack e‑commerce application built with React, TypeScript, Firebase, and React Query. This project includes user authentication, product management, a shopping cart system, order history, and a fully responsive UI styled with Bootstrap.

## 🚀 Features
🧑‍💻 User Accounts
Register, login, and logout with Firebase Authentication

Real‑time user profile updates (name, address, email)

Delete account functionality

## 🛒 Shopping Experience
Add products to cart

Increase/decrease quantities

Remove items or clear entire cart

Checkout flow that creates an order in Firestore

Cart state stored globally with React Context

## 📦 Orders & History
Orders stored in Firestore with:

userId

createdAt timestamp

total price

list of purchased items

Order History page showing all orders for the logged‑in user

Order Details page showing full breakdown of each order

## 🛍️ Product Management
Add new products

Edit existing products

Delete products

Product grid with categories, filtering, and responsive layout

⚡ Data Fetching & State
React Query for caching and fetching products & categories

Firestore real‑time listeners for user profile

## 🎨 UI & Styling
Bootstrap 5 components

Custom brand colors

Responsive product grid

Hero section and background styling

## 🧰 Tech Stack
### Frontend
React (TypeScript)

React Router

React Query

Bootstrap 5

### Backend
Firebase Authentication

Firebase Firestore

Firebase Storage (optional for product images)

State Management
React Context (Cart)

React Query (Server state)

## 📁 Project Structure
Code
src/
│── App.tsx
│── main.tsx
│── NavBar.tsx
│── ProductsList.tsx
│── ViewShoppingCart.tsx
│── OrderHistory.tsx
│── OrderDetails.tsx
│── UserProfile.tsx
│── AddProductForm.tsx
│── EditProductForm.tsx
│── CartContext.tsx
│── useAuth.ts
│── useUserProfile.ts
│── fetchProducts.ts
│── fetchCategories.ts
│── createOrder.ts
│── firebaseConfig.ts
│── index.css
🔧 Installation & Setup
1. Clone the repository
bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Install dependencies
bash
npm install
3. Configure Firebase
Create a Firebase project and add your config inside:

Code
src/firebaseConfig.ts
4. Start the development server
bash
npm run dev
🧪 Core Functionality Overview
🔐 Authentication
useAuth() wraps Firebase’s onAuthStateChanged and exposes:

user

loading

## 🛒 Cart System
CartContext provides:

cartItems

addToCart()

removeFromCart()

clearCart()

## 📦 Order Creation
createOrder() writes a new order to Firestore:

userId

createdAt

totalPrice

items[]

## 📜 Order History
Queries Firestore for:

ts
where("userId", "==", user.uid)
orderBy("createdAt", "desc")
Requires a composite index in Firestore.

## 🧹 Known Requirements
🔧 Firestore Composite Index Needed
For Order History to work, create this index:

Field	Direction
userId	Ascending
createdAt	Descending
Firestore will prompt you with a link when needed.

## 📸 Screenshots 

Home page
<img width="1442" height="807" alt="Screenshot 2026-03-18 at 4 50 18 PM" src="https://github.com/user-attachments/assets/e7b58563-51b8-4284-9106-34b967bab0c9" />

Product grid
<img width="1441" height="893" alt="Screenshot 2026-03-18 at 4 52 00 PM" src="https://github.com/user-attachments/assets/90e97e5e-c857-479d-b6d6-fa3024de7375" />

Cart
<img width="1432" height="563" alt="Screenshot 2026-03-18 at 4 50 38 PM" src="https://github.com/user-attachments/assets/0b58c9b3-dd9a-4139-80a2-d787f9b33cb4" />

Order history
<img width="1371" height="473" alt="Screenshot 2026-03-18 at 4 53 22 PM" src="https://github.com/user-attachments/assets/6c1c463c-6e58-4e1e-bf00-32702dc7e153" />
<img width="1348" height="576" alt="Screenshot 2026-03-18 at 5 00 40 PM" src="https://github.com/user-attachments/assets/8f815050-bc60-4d61-9bdc-8ef03ac0370e" />


Profile page 
<img width="1379" height="396" alt="Screenshot 2026-03-18 at 4 52 45 PM" src="https://github.com/user-attachments/assets/1bd50ad1-7f47-4d14-8f32-24435f68c08f" />


## 🤝 Contributing
Pull requests are welcome!
If you’d like to add features (Stripe checkout, product search, admin dashboard), feel free to open an issue.

## 📄 License
MIT License — free to use and modify.
