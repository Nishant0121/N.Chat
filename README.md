# Setup Instructions

## Prerequisites:
  Node.js and npm installed.
  
  MongoDB installed or access to a MongoDB cloud instance.
  
  Git installed.

## Steps to Run Locally:
1 Clone the Repository
```bash
  git clone https://github.com/Nishant0121/N.Chat
  cd N.Chat
```

## Set Up Environment Variables Create a .env file in the backend directory with the following:
```bash
  MONGO_URI=<your-mongodb-uri>
  JWT_SECRET=<your-jwt-secret>
  PORT=5000
```

## Install Backend Dependencies
```bash
  cd backend
  npm install
```

## Run the Backend Server
```bash
  npm start
```

## Install Frontend Dependencies
```bash
  cd frontend
  npm install
```

## Run the Frontend Application
```bash
  npm start
```

Access the Application Open http://localhost:3000 in your browser.

# Hosted URL
## On Vercel 
:: https://n-chat-sable.vercel.app
  (It Can take time to render the data)
