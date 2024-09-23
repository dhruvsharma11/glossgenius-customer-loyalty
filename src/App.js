import React, { useState } from "react";
import Booking from "./components/Booking";
import LoyaltyProgram from "./components/LoyaltyProgram";
import { bookAppointment } from "./services/api";

function App() {
  const [customerId, setCustomerId] = useState(null);

  const handleBooking = (customerId, service) => {
    const customerData = bookAppointment(customerId, service);
    setCustomerId(customerId);
  };

  return (
    <div className="App">
      <h1>Customer Loyalty Program</h1>
      <Booking onBook={handleBooking} />
      {customerId && <LoyaltyProgram customerId={customerId} />}
    </div>
  );
}

export default App;
