# Xomato Food Delivery Application

## Introduction

Xomato is a food delivery application that allows users to explore and order from a variety of restaurants.

## Features

- Browse and search for food items by category.
- Add items to the cart and place orders.
- User authentication and authorization.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- React.js

## Installation

### Prerequisites

- Node.js installed on your machine
- MongoDB server

### Steps
1. Clone the repository:

   git clone https://github.com/MikeshChevli/Xomato.git

2. Navigate to the project directory:

    cd xomato

3. Install dependencies for the server:

    cd Xomato_Server
    npm install

4. Install dependencies for the client:

    cd Xomato_Client
    Application is designed to render a production build of react framework, so you can skip this step


5. Create a .env file in the server directory with the following content:

    PORT=your_port_number
    MONGO_URL=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret

6. Start the MongoDB server.

    cd Xomato_Server
    npm start

7. Access the application in your browser at http://localhost:3000 (or the specified port).