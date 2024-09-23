import axios from "axios";

const API_URL = "http://localhost:5001";

export const bookAppointment = (data) =>
  axios.post(`${API_URL}/api/book`, data);

export const getCustomerVisits = (email) =>
  axios.get(`${API_URL}/api/customer-visits`, {
    params: { email },
  });
