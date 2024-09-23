import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookingForm from "./components/BookingForm";

function App() {
  const [searchParams] = useSearchParams();

  return <div className="App">{<BookingForm />}</div>;
}

export default App;
