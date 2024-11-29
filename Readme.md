
# VRV Security RBAC Task Round

This project implements a Role-Based Access Control (RBAC) system for managing user roles and permissions. It consists of a client-side application and a server-side backend, both designed to work together seamlessly.

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Default Credentials](#default-credentials)
- [Deployment](#deployment)


## Features
- Role-based access management
- User authentication and authorization
- Secure API endpoints
- Responsive front-end design

## Screenshots

![Screenshot 1](image1.png)  
*Caption: login screen tap quick login credential icons to use defalut password*

![Screenshot 2](image2.png)  
*Caption: Admin role have delete button*

![Screenshot 3](image3.png)  
*Caption: Admin can change user can post or not*

![Screenshot 4](image4.png)  
*Caption: user without admin permit cannot post anything*

![Screenshot 5](image5.png)  
*Caption: user can post if admin grant access*

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ravi02RR/VRV-SecurityRBAC-TaskRound.git
   ```

2. Navigate to the project directory:
   ```bash
   cd vrv-securityrbac-taskround
   ```

### Running the Client

1. Navigate to the `client` folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Running the Server

1. Open a new terminal and navigate to the `server` folder:
   ```bash
   cd ../server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

### Access the Application
Once both the client and server are running, open your browser and navigate to:
```
Frontend: http://localhost:5173
Backend: http://localhost:3000
```

## Usage

### Default Credentials

#### User
- **Email:** `user@gmail.com`  
- **Password:** `user1234`

#### Admin
- **Email:** `admin@gmail.com`  
- **Password:** `admin1234`

## Deployment
The application is deployed at the following link:

[VRV Security RBAC Task Round - Deployment](https://vrv-securityrbac-taskround.onrender.com/)

