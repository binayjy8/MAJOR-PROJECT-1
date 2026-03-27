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

- Displays featured product categories
- Clicking a category redirects to Product Listing page with applied filter
- Displays all products with filters and sorting
- Filters: Category (Checkbox), Ratings (Slider), Clear Filters button
- Sorting: Price: Low → High, Price: High → Low
- Wishlist Management
- Loading & Alerts

---

## API Reference

## **/products** <br>

GET – List all products<br>
Sample Response:<br>
```
[{_id, name, price, rating, image, category}]
```

## **/products/:productId** <br>

GET – Get product by ID <br>
Sample Response: <br>

```
[{_id, name, description, price, rating, image, category}]
```

## **/categories** <br>

GET – List all categories <br>
Sample Response: <br>

```
[{_id, name}]
```

## **/categories/:categoryId** <br>

GET – Get category by ID <br>
Sample Response: <br>

```
[{_id, name}]
```

## **/orders** <br>

POST – Create Order <br>
Sample Request: <br>

```
[{items, totalAmount, address}]
```

## Contact

For bugs and feature request, please reach out to mohantabinaybhusan@gmail.com