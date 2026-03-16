# Advanced E‑Commerce Website
A responsive, React‑based e‑commerce storefront built to demonstrate modern frontend development skills, including dynamic product filtering, global cart state management, React Router navigation, and a polished Bootstrap UI. Products are fetched from the Fake Store API, and users can browse items, filter by category, add products to a cart, and simulate a checkout experience with a lightweight success banner.

## 📌 Table of Contents
Overview

Features

Tech Stack

Project Structure

Installation

Usage

API

Screenshots

Future Enhancements

Credits

Author

## 🛍️ Overview
This project is a fully functional front‑end e‑commerce experience built with React, TypeScript, React Query, React Router, and Bootstrap. It demonstrates:

Clean component architecture

Global state management using React Context

API data fetching with caching

Dynamic UI updates

A responsive, user‑friendly shopping flow

The goal was to create a polished, real‑world style storefront while strengthening React fundamentals and modern tooling.

## ✨ Features
Product Listing  
Fetches products from Fake Store API and displays them in responsive Bootstrap cards.

Category Filtering  
Users can filter products by category using a dropdown in the navbar.

Global Shopping Cart  
Add/remove items from anywhere in the app using a shared CartContext.

Cart Quantity Tracking  
Navbar displays the total number of items in the cart in real time.

Checkout Simulation  
A lightweight success banner appears after checkout and fades out automatically.

Routing  
React Router powers navigation between the Home page and Cart page.

Responsive UI  
Built with Bootstrap for clean, mobile‑friendly layouts.

## 🧰 Tech Stack
React + TypeScript

React Router

React Query

React Context API

Bootstrap 5

Axios

Vite

## 📁 Project Structure
Code
src/
│── api.ts
│── App.tsx
│── CartContext.tsx
│── main.tsx
│── NavBar.tsx
│── ProductsList.tsx
│── ViewShoppingCart.tsx
│── App.css
## ⚙️ Installation
Clone the repository:

bash
git clone https://github.com/YOUR_USERNAME/AdvancedECommerceWebsite
cd AdvancedECommerceWebsite
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
## 🚀 Usage
Browse products on the home page

Filter by category using the navbar dropdown

Add items to your cart

View your cart via the navbar

Remove items or clear the cart

Click Checkout to simulate a purchase and trigger a success banner

## 🌐 API
This project uses the Fake Store API:

Code
https://fakestoreapi.com/products
It returns product data including:

Title

Price

Description

Category

Rating

Image

## 🔮 Future Enhancements
Product detail pages

User authentication

Persistent cart (localStorage)

Search bar

Dark mode

Backend integration for real checkout

## 🙏 Credits
Fake Store API

Bootstrap documentation

React Query documentation

Coding Temple bootcamp

GitHub Copilot assistance

👩‍💻 Author
Mary Fobbs‑Guillory  
Library professional transitioning into software engineering
San Francisco Bay Area
