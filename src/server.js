const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const twilio = require("twilio");

const accountSid = "AC8f3b90484f0799331327654c883182ea";
const authToken = "960280f3c73ea2e94faa24fb4cfac4bf";
const client = twilio(accountSid, authToken);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "demo",
  password: "1nov2003",
  port: 5432,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const generateDiscountCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const sendDiscountCode = async (phoneNumber, discountCode) => {
  try {
    await client.messages.create({
      body: `Congrats! You've earned a discount. Use code ${discountCode} for a free haircut of your choice!`,
      from: "+17722910067",
      to: phoneNumber,
    });
  } catch (error) {
    console.error("Error sending SMS", error);
  }
};

app.post("/api/book", async (req, res) => {
  const { name, email, service, price, phoneNumber } = req.body;

  try {
    const client = await pool.connect();

    const customerQuery = await client.query(
      "SELECT * FROM customers WHERE email = $1",
      [email]
    );

    let visits = 1;
    if (customerQuery.rows.length > 0) {
      visits = customerQuery.rows[0].visits + 1;
      if (visits > 5) {
        visits = 1;
      }
      await client.query("UPDATE customers SET visits = $1 WHERE email = $2", [
        visits,
        email,
      ]);
    } else {
      await client.query(
        "INSERT INTO customers (name, email, visits, phone_number) VALUES ($1, $2, $3, $4)",
        [name, email, visits, phoneNumber]
      );
    }

    const result = await client.query(
      "INSERT INTO appointments (name, email, service, price, visits) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, service, price, visits]
    );

    if (visits === 5 && phoneNumber) {
      const discountCode = generateDiscountCode();
      console.log("Sending discount code:", discountCode);
      await sendDiscountCode(phoneNumber, discountCode);

      await client.query(
        "UPDATE customers SET discount_code = $1 WHERE email = $2",
        [discountCode, email]
      );
    }

    client.release();
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: result.rows[0],
      visits: visits,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error booking appointment",
    });
  }
});

app.get("/api/customer-visits", async (req, res) => {
  const { email } = req.query;

  try {
    const client = await pool.connect();

    const result = await client.query(
      "SELECT visits FROM customers WHERE email = $1",
      [email]
    );

    client.release();

    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        visits: result.rows[0].visits,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
  } catch (err) {
    console.error("Error fetching customer visits", err);
    res.status(500).json({
      success: false,
      message: "Error fetching customer visits",
    });
  }
});

app.post("/api/verify-discount", async (req, res) => {
  const { email, code } = req.body;

  try {
    const client = await pool.connect();

    const result = await client.query(
      "SELECT discount_code FROM customers WHERE email = $1",
      [email]
    );

    client.release();

    if (result.rows.length > 0) {
      const storedCode = result.rows[0].discount_code;

      if (storedCode === code) {
        res.status(200).json({
          success: true,
          message: "Discount code is valid.",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid discount code.",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }
  } catch (err) {
    console.error("Error verifying discount code", err);
    res.status(500).json({
      success: false,
      message: "Error verifying discount code.",
    });
  }
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
