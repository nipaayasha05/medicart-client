## Medicart

Medicart is a multi-vendor e-commerce platform specializing in medicine sales

## Admin

- username :admin
- email:admin@gmail.com
- password:ABC123abc@

## Live site URL : https://illustrious-pudding-bb0b01.netlify.app/

## Screenshots

![Medicine Screenshot](https://i.ibb.co/qL7nMxY3/Screenshot-2025-08-08-125107.png)

## Description

Medicart is a multi-vendor e-commerce platform for selling medicines. The project features role-based access where sellers can add medicines categorized by type. Users can browse products, add them to their cart, and make payments securely via Stripe.

## features

- Firebase Authentication using email/password and social login(google)
- ole-based access control (admin, seller, user).
- Responsive design for all screen sizes.
- Separate dashboards for admin, seller, and user.
- Cart page: adjust quantity, remove items, clear cart.
- Checkout via Stripe with live payment integration.
- After successful payment, user sees an invoice page with print/download (PDF) feature.
- Manage Users: change roles, promote/demote users.
- Manage Categories: add/update/delete categories with image upload.
- Payment Management: approve pending payments.

## Technologies Used

React.js
Firebase
Tailwind CSS

## Dependencies

The project uses the following npm packages:

- headlessui/react
- @react-pdf/renderer
- @stripe/react-stripe-js
- @stripe/stripe-js
- @tailwindcss/vite
- @tanstack/react-query
- @tanstack/react-table
- axios
- daisyui
- firebase
- html2canvas
- jsonwebtoken
- react
- react-dom
- react-export-table-to-excel
- react-helmet
- react-hook-form
- react-hot-toast
- react-icons
- react-responsive-carousel
- react-router
- react-to-pdf
- sweetalert2
- swiper
- tailwindcss

### How to Run Locally

1. Clone the repository  
   `git clone https://github.com/yourusername/greenspire.git`
2. Navigate to the project directory  
   `cd greenspire`
3. Install dependencies  
   `npm install`
4. Create a `.env` file and add your Firebase config variables
5. Start the development server  
   `npm start`
6. Open your browser and go to `http://localhost:3000`

### Resources

- [GitHub Repository](https://github.com/nipaayasha05/medicine-selling-e-commerce-website)
- [Live Demo](https://illustrious-pudding-bb0b01.netlify.app/)
