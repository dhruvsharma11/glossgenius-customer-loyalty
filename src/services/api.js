const customers = {};

export const bookAppointment = (customerId, service) => {
  if (!customers[customerId]) {
    customers[customerId] = { visits: 0, rewards: [] };
  }
  customers[customerId].visits += 1;
  return customers[customerId];
};
