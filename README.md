# GlossGenius Customer Loyalty Feature Prototype

When reviewing GlossGenius and its wide array of features, I noticed they have implemented almost everything a small business might need. This piqued my curiosity about what additional features could expand their business vertically, and that’s when I brainstormed and created this prototype for a **Customer Loyalty** feature, which wasn't listed on the company website!

## Overview

This prototype introduces a **Customer Loyalty Program** that rewards users for their repeated bookings. If a user books five times with the same business, they receive a discount code that can be redeemed for future bookings.

## Video Demo


https://github.com/user-attachments/assets/327af937-2dc7-4724-be15-d0bde70c6045


## Features

1. **Appointment Booking:**

   - Users can book an appointment via the client website (mocked for this prototype as _Groovy Dhruvy's Salon_). I’ve tried to mimic the booking page from GlossGenius to closely match its look and feel!

2. **PostgreSQL Database Integration:**

   - Appointments are stored in a PostgreSQL database. If the user is a new customer, their information is saved in the database as well.

3. **Loyalty Reward:**

   - When a user books five times with the store (for this prototype, there is only one store), an alert is triggered:
     ```
     Thank you for being a loyal customer! We have sent you a discount code.
     ```

4. **SMS Notification (via Twilio):**

   - The user receives a text message containing a randomly generated, 8-character alphanumeric discount code. This code is also stored in the database with the customer's information.

5. **Discount Code Validation:**

   - Users can enter the received discount code on the booking page, and upon clicking "Verify Code", the server checks the code against the database. If valid, the discount is applied to their booking.

6. **Automatic Discount Application:**
   - For the purpose of this prototype, once the discount code is verified, the price for all services is changed to **free**.

## Next Steps

Here are some potential enhancements and customizable options for the Customer Loyalty feature:

- **Customizable Loyalty Rules:**

  - Each client can have the flexibility to define their own customer loyalty rules.
  - Clients can choose whether to enable or disable the loyalty program.

- **Configurable Discount Options:**
  - Type of discount (e.g., 50% off, free service).
  - Number of visits required to trigger the reward.
  - Expiration date for loyalty rewards.

---

## Future Development

These are some potential ideas for future development:

1. **Customizable Interface:**

   - A dashboard where business owners can set up their own customer loyalty rules.

2. **Advanced Discount Rules:**

   - The ability to offer different types of discounts, such as percentage-based discounts or time-limited promotions.

3. **Enhanced Reporting:**
   - Adding reports and analytics for business owners to see how their customer loyalty program is performing.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/glossgenius-customer-loyalty.git
   cd glossgenius-customer-loyalty
   ```
2. Install dependencies:

   In your project directory, install the necessary Node.js packages by running:

   ```bash
   npm install
   ```

3. Set up Environment Variables:

   ```
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    PG_USER=your_postgresql_username
    PG_HOST=your_postgresql_host
    PG_DATABASE=your_postgresql_database
    PG_PASSWORD=your_postgresql_password
    PG_PORT=your_postgresql_port
   ```

4. **Run the server:**

   To run the application, you'll need to start both the web development server and the Node server in `src`. Follow the steps below:

   - **Start the Node.js server:**

     Navigate to the `src` directory and start the Node.js server by running:

     ```bash
     cd src
     node server.js
     ```

   - **Start the web development server:**

     Open a new terminal and run the following command to start the web development server:

     ```bash
     npm start
     ```

   Both servers should now be running. The web server will be accessible via the specified local port (usually `http://localhost:3000`), and the Node.js server will be listening for API requests.
