# E-Commerce Website

A feature-rich e-commerce website built with the React.js framework.

## Demo

[Live Demo](https://reactjs-ecommerce-app.vercel.app/)

## Features

- Easy integration with backend services
- Fully responsive design

## Screenshots

![App Screenshot](https://i.ibb.co/fQ293tm/image.png)

## Run Locally

Clone the project:

```bash
git clone https://github.com/ssahibsingh/React_E-Commerce
```

Navigate to the project directory:

```bash
cd React_E-Commerce
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```
# Docker Setup
## Technologies Required

- Docker
- Docker-Compose
- Postman 

## Backend Setup

1. Clone the backend repository:

   ```bash
   git clone https://github.com/ondecentral/fk-backend.git
   cd fk-backend
   ```

2. Start the backend server with Docker Compose:

   ```bash
   docker-compose up -d
   ```

3. Use Postman to complete the signup, as certain fields are encrypted (e.g., `company_name`, `profile_picture`). These fields have no corresponding frontend input, so you’ll need to set them via Postman initially. Once registered, log into the frontend and generate an API Key.

   **User Registration:**
   - **URL:** `http://localhost:3002/oauth/signup`
   - **Method:** `POST`
   - **Headers:**
     - `Content-Type: application/json`
   - **Request Body:**
     ```json
     {
       "name": "John Doe",
       "company_name": "Example Corp",
       "email": "test@gmail.com",
       "picture": "http://example.com/picture.jpg",
       "password": "Test1234",
       "otp": null,
       "otpExpiry": null,
       "verified": false,
       "isGuest": true,
       "call_count": null,
       "onboarding": null,
       "deleted": false,
       "deletedExpiry": null
     }
     ```

   **User Login:**
   - **URL:** `http://localhost:3002/oauth/login`
   - **Method:** `POST`
   - **Headers:**
     - `Content-Type: application/json`
   - **Request Body:**
     ```json
     {
       "email": "test@gmail.com",
       "password": "Test1234"
     }
     ```

   **Get API Key:**
   - **URL:** `http://localhost:3002/api/key`
   - **Method:** `POST`
   - **Headers:**
     - `Content-Type: application/json`
     - `Authorization: Bearer <your_token>`
   - **Response:**
     ```json
     {
       "key": "Your key"
     }
     ```

## Frontend Setup

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/ondecentral/adAttr-frontend
   cd adAttr-frontend
   ```

2. Update the `.env` file with the backend endpoint:

   ```env
   VITE_SERVER_ENDPOINT=http://0.0.0.0:3002
   ```

3. Build and run the Docker container for the frontend:

   ```bash
   docker build -t adAttr-frontend .
   docker run -p 8000:8000 adAttr-frontend
   ```

4. Open [http://localhost:8000](http://localhost:8000) to view the application and log in with:
   - **Email:** `test@gmail.com`
   - **Password:** `Test1234`

## Ecommerce Client SDK Setup:

1. Clone the ecommerce-client-sdk-example repository:

   ```bash
   git clone https://github.com/ondecentral/ecommerce-client-sdk-example
   cd ecommerce-client-sdk-example
   ```

2. Update the keys and URLs in the `.env` file:

   ```env
   REACT_APP_BASE_URL=http://0.0.0.0:3002
   REACT_APP_API_KEY='your Key'
   ```

3. Build and run the Docker container for the SDK:

   ```bash
   docker build -t ecommerce-sdk .
   docker run -p 3000:3000 ecommerce-sdk
   ```
