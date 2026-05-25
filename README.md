# 🌍 Natours - Tour Booking REST API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

> A highly scalable, secure, and modern RESTful API for a tour booking application, architected with Node.js, Express, and MongoDB.

## 📖 Overview

Natours is a feature-rich backend infrastructure designed to manage comprehensive tour booking operations. Built with a focus on performance, security, and clean architecture, this API handles everything from user authentication and geographic location filtering to complex data aggregation and modeling. This repository serves as a showcase of advanced backend engineering patterns and best practices.

## ✅ Completed Features & Technical Highlights

- **Advanced System Architecture:**
  - Architected a scalable API adhering to strict DRY principles.
  - Implemented generic CRUD handler factory functions, drastically reducing boilerplate code across 15+ distinct endpoints.
- **Complex Data Engineering:**
  - Optimized database operations using MongoDB aggregation pipelines (utilizing up to 7 stages) to calculate real-time tour statistics, ratings, and booking frequencies.
- **Robust Security Implementation:**
  - **Authentication:** Modern stateless JWT (JSON Web Token) authentication flow.
  - **Cryptography:** Implemented Argon2 for state-of-the-art password hashing.
  - **Middleware Defenses:** Architected robust Express security middlewares including Helmet (HTTP headers), rate-limiting (brute-force protection), and NoSQL injection sanitization.

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Security:** JWT, Argon2, Helmet, Express Rate Limit, Mongo Sanitize

## 🚧 Roadmap (Yet To Be Done)

The application is actively being developed with the following features in the pipeline, demonstrating ongoing project growth and engineering foresight:

- [ ] **Complex Data Modeling:** Designing interconnected Mongoose schemas featuring embedding, parent-child referencing, and advanced virtual populate strategies.
- [ ] **Geospatial Processing:** Leveraging native MongoDB geospatial indexing (`2dsphere`) to unlock location-based radius filtering and proximity calculations.
- [ ] **Advanced Security Enhancements:** Further fortifying the API against emerging vulnerabilities and refining permission matrices.
- [ ] **UI/UX Refinements:** Preparing the backend to serve a highly interactive, server-side rendered or decoupled client application (incorporating visual improvements from pending UI designs).
- [ ] **Payment Gateway Integration:** Implementing Stripe API for secure, seamless checkout sessions and payment processing.
- [ ] **Email Handling Services:** Integrating automated email workflows (e.g., SendGrid/Nodemailer) for welcome messages, password resets, and booking confirmations.

## 💻 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local instance or Atlas URI)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/devChathura/natours.git
   cd natours
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `config.env` file in the root directory and configure the necessary environment variables:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE=<your_mongodb_connection_string>
   DATABASE_PASSWORD=<your_database_password>
   JWT_SECRET=<your_jwt_secret_key>
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

## 📄 License

This project is open-source and available under the [ISC License](LICENSE).
