# E-Commerce App

---
A full-featured E-Commerce Web Application built using React JS (Frontend) and Node.js + Express + MongoDB (Backend).
This project implements real-world e-commerce functionalities including product browsing, cart management, wishlist, checkout, and order management.

---
## Demo Link
[Live Demo] (https://major-project-1-dun.vercel.app/)

---

## Quick Start
```
git clone https://github.com/binayjy8/MAJOR-PROJECT-1.git
cd my-app
npm install
npm run dev
```

---

## Technologies

- React JS
- Bootstrap
- React Router
- Context API / State Management
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Demo Video

Watch a walk through (4 minutes) of all the major features of this app:
[Demo Video] (https://drive.google.com/file/d/1IdFyts5Hn1OoB3tGKi7alf2gRKl4xSLU/view?usp=sharing)

---

## Features

- Displays featured product categories on the homepage.
- Redirects users to the Product Listing page with applied filters when a    category is selected.
- Displays all products with filtering and sorting options.
- Allows users to filter products by category using checkboxes.
- Enables users to filter products based on ratings using a slider.
- Provides an option to clear all applied filters.
- Allows users to sort products by price (Low to High and High to Low).
- Enables users to manage wishlist items.
- Displays loading states and alert messages for better user feedback.

---

## API Reference

## **GET/products** <br>

Retrieves all products.<br>
Sample Response:<br>
```
[{"name", "product", "price": 1000}]
```

## **GET/products/:productId** <br>

Retrieves a single product by ID. <br>
Sample Response: <br>

```
[{"product": "name", "description", "price", "category"}]
```

## **GET/categories** <br>

Retrieves all categories. <br>
Sample Response: <br>

```
[{"category": "name", "description"}]
```

## **GET/categories/:categoryId** <br>

Retrieves a category by ID <br>
Sample Response: <br>

```
[{"data": "category", "name", "description"}]
```

## **POST/orders** <br>

Creates a new order <br>
Sample Request: <br>

```
[{items, totalAmount, address}]
```

## Contact

For bugs and feature request, please reach out to mohantabinaybhusan@gmail.com