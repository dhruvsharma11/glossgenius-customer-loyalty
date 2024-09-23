import React, { useState } from "react";

const Booking = ({ onBook }) => {
  const [customerId, setCustomerId] = useState("");
  const [service, setService] = useState("");

  const handleBoking = () => {
    onBook({ customerId, service });
  };

  return (
    <div className="booking-container">
      <input
        type="text"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Enter Customer ID"
      />
      <input
        type="text"
        value={service}
        onChange={(e) => setService(e.target.value)}
        placeholder="Enter Service"
      />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default Booking;
