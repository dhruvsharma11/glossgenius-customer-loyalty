import { useState, useEffect } from "react";
import { bookAppointment, getCustomerVisits } from "../utils/api";

function BookingForm() {
  const initialServices = [
    { name: "Haircut", price: 30 },
    { name: "Wash", price: 20 },
    { name: "Trim", price: 15 },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState(30);
  const [visits, setVisits] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [services, setServices] = useState(initialServices);

  useEffect(() => {
    if (email) {
      getCustomerVisits(email)
        .then((response) => setVisits(response.data.visits))
        .catch((error) =>
          console.error("Error fetching customer visits", error.message)
        );
    }
  }, [submitted]);

  const handleBooking = async () => {
    try {
      const response = await bookAppointment({
        name,
        email,
        service,
        price,
        referralCode,
        phoneNumber,
      });

      setSubmitted(true);
      setService(initialServices);

      if (response.data.visits === 5) {
        alert("You've reached 5 visits! A discount code has been sent to you.");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error booking appointment",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    const serviceData = services.find((s) => s.name === selectedService);
    if (serviceData) {
      setService(selectedService);
      setPrice(serviceData.price);
    }
  };

  const verifyDiscountCode = async () => {
    console.log("Referral Code", referralCode);

    try {
      const response = await fetch(
        "http://localhost:5001/api/verify-discount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code: referralCode }),
        }
      );

      console.log("Response", response);

      const data = await response.json();
      if (data.success) {
        setVerificationMessage("Discount code is valid!");

        const updatedServices = services.map((service) => ({
          ...service,
          price: 0,
        }));
        setServices(updatedServices);
      } else {
        setVerificationMessage("Invalid discount code.");
      }
    } catch (error) {
      console.error("Error verifying discount code", error);
      setVerificationMessage("Error verifying discount code.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/barber.jpg')`,
          filter: "blur(10px)",
          zIndex: 0,
        }}
      />

      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{ zIndex: 1 }}
      ></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md space-y-4 p-6 bg-transparent">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Groovy Dhruvy's Salon
        </h1>

        <input
          type="text"
          placeholder="First Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 bg-transparent text-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 bg-transparent text-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full mb-4 p-3 bg-transparent text-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <select
          onChange={handleServiceChange}
          className="w-full mb-4 p-3 bg-transparent text-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option>Select a Service</option>
          {services.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name} - ${s.price}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Referral Code (Optional)"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          className="w-full mb-4 p-3 bg-transparent text-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <span
          onClick={verifyDiscountCode}
          className="cursor-pointer text-purple-400 hover:underline"
        >
          Verify Discount Code
        </span>

        <button
          onClick={handleBooking}
          className="w-1/2 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:bg-purple-700 transition-all duration-200"
        >
          Book Appointment
        </button>

        {verificationMessage && (
          <p className="mt-4 text-center text-gray-300">
            {verificationMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default BookingForm;
