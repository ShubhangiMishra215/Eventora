# Eventora - Full Stack Event Booking App

A full-stack event booking web application built with React, Node.js, Express, and MongoDB.

## Table of contents

- [Overview](#overview)
  - [Features](#features)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### Features

Users should be able to:

- Register and log in with OTP email verification
- Browse and search available events
- Book events and manage their bookings
- View booking confirmation and failure screens
- Access an admin dashboard to create and manage events
- View the optimal layout depending on their device's screen size

### Links

- Solution URL: (https://github.com/ShubhangiMishra215/Eventora.git)
- Live Site URL:(https://eventora-alpha.vercel.app/)

## My process

### Built with

- React + Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (OTP verification)
- Concurrently (run frontend + backend together)

### What I learned

- How to structure a full-stack project with separate `client/` and `server/` directories and run both simultaneously using `concurrently`
- How to configure Tailwind CSS v4 using the CSS-based approach (`@import "tailwindcss"`, `@theme`, `@variant dark`) instead of `tailwind.config.js`
- How to implement OTP-based email verification using Nodemailer, including Gmail's same-address limitation
- How to debug Mongoose schema errors, controller bugs, and seeding script issues with MongoDB Atlas
- How to set up protected routes and admin routes with JWT authentication

### Continued development

- Payment integration (Razorpay or Stripe)
- Seat selection UI for events
- Improved admin analytics dashboard

### Useful resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs) - Essential for understanding the new CSS-based config approach
- [Mongoose Docs](https://mongoosejs.com/docs/) - Helped with schema design and query debugging
- [Nodemailer Docs](https://nodemailer.com/) - Used for setting up OTP email delivery

## Author

- GitHub - [@ShubhangiMishra215](https://github.com/ShubhangiMishra215)