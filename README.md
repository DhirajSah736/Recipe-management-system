# Recipe Management System (Frontend)


## 📌 Overview
The **Recipe Management System** is a web application that allows users to **add, edit, and delete recipes** with details such as **recipe name, ingredients, instructions, and categories**. This project is built using **React** for the frontend and communicates with an **ASP.NET Core API** as the backend.

## 🚀 Features
- 📌 Add new recipes with necessary details
- ✏️ Edit existing recipes
- ❌ Delete recipes
- 🔍 View a list of all recipes
- 🔄 State management using Redux
- 🎨 User-friendly UI with Bootstrap

## 🛠️ Technologies Used
- **React** (Frontend)
- **Bootstrap** (Styling)
- **Axios** (API Requests)
- **ASP.NET Core API** (Backend - Not included in this repo)
- **SQL** (Database)

## 📂 Folder Structure
```
recipe-management-frontend/
│── public/
│── src/
│   ├── components/    # Reusable components
│       ├── CrudUI.css
|       ├── CruidUI.jsx  
│   ├── App.css
│   ├── App.test.js        
│   ├── App.js         # Main component
│   ├── index.js       # Entry point
│── package.json
│── README.md
```

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git https://github.com/DhirajSah736/Recipe-management-system.git
cd recipe-management-system
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Start the Development Server
```sh
npm start
```

## 🔗 API Integration
This frontend connects to an **ASP.NET Core API**. Ensure that your backend is running and updat.
```js
const API_BASE_URL = "http://localhost:5032/api/recipes"; // Change this if necessary
```