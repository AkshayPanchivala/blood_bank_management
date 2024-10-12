

# Blood Bank Management System

A web-based Blood Bank Management System designed to streamline the process of blood donation and blood request management. This system allows **users**, **admin**, and **hospitals** to interact with the system in different ways. The project uses **React.js** for the frontend, **Node.js** for the backend, **MongoDB** as the database, and **Material-UI** for styling the components.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Roles](#roles)
  - [User](#user)
  - [Admin](#admin)
  - [Hospital](#hospital)
---

## Features

- **User Panel:**
  - Users can register as donors or request blood for specific blood groups.
  - Users can track the status of their requests (accepted or rejected).
  - Users can view hospitals in their city for convenience.

- **Admin Panel:**
  - Admin can manage hospitals by adding them based on city and state.
  - Admin can view a list of all hospitals and manage their details.

- **Hospital Panel:**
  - Hospitals can view and manage blood requests sent by users.
  - Hospitals can track the blood bottle availability for each blood group.

---

## Tech Stack

- **Frontend:** React.js, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **API Integration:** REST APIs for user and hospital communication

---

## Installation

### Prerequisites

Ensure you have **Node.js** and **MongoDB** installed on your machine.

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/AkshayPanchivala/blood_bank_management.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blood_bank_management
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

5. Set up environment variables:

   - Create a `.env` file in the **backend** folder and configure it with your MongoDB URI, JWT secret, etc.
   
   Example `.env` file:
   ```
   PORT=5000
   database_url=<your_database_url>
   PASSWORD_ENCRYPT_LEVEL=12
   CREATEHASH_KEY=sha256
   JWT_SECRET=ThisIsSecretKeyBloodbank
   JWT_EXPIRES_IN=1d
   EMAIL_USERNAME=<your_mail_ID
   EMAIL_PASSWORD=<your_email_token>
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   ```


6. Start the backend server:

   ```bash
   cd backend
   npm start
   ```
7. Set up environment variables:

   - Create a `.env` file in the **frontend** folder and configure it with your REACT_APP_BASEURL
   
   Example `.env` file:
   
   ```
   REACT_APP_BASEURL=http://127.0.0.1:5000/api
     ```
   
8. Start the frontend server:

   ```bash
   cd ../frontend
   npm start
   ```

9. Open the application at `http://localhost:3000`.

---

## Usage

- Users can register and log in to donate or request blood.
- Hospitals can log in to manage blood requests and update blood stock.
- Admins can manage hospitals, adding cities and states.

---

## Roles

### User

- **Register/Login:** Users can create an account or log in.
- **Donate Blood:** Users can donate blood by providing their blood group.
- **Request Blood:** Users can request a specific blood group from hospitals in their city.
- **View Request Status:** Users can check if their request has been accepted or rejected.
- **City-Wise Hospitals:** Users can view hospitals in their area.

### Admin

- **Add Hospitals:** Admins can add new hospitals to the system by selecting the city and state.
- **Manage Hospitals:** Admins can update or delete hospitals from the list.
- **View Requests:** Admins can view all hospital details and requests.

### Hospital

- **Manage Requests:** Hospitals can manage requests sent by users and approve/reject them.
- **Manage Blood Bottles:** Hospitals can update the number of blood bottles available for each blood group.

---
