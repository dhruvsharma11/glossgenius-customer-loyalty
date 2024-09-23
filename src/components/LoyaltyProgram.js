import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

const LoyaltyProgram = ({ customerId }) => {
  const [visits, setVisits] = useState(0);
  const [rewardAvailable, setRewardAvailable] = useState(false);

  useEffect(() => {
    if (visits >= 5) {
      setRewardAvailable(true);
    }
  }, [visits]);

  const incrementVisits = () => {
    setVisits(visits + 1);
  };

  return (
    <div>
      <p>Visits: {visits}</p>
      <button onClick={incrementVisits}>Increment Visits</button>
      {rewardAvailable && (
        <div>
          <p>Reward unlocked! Here is your QR Code:</p>
          <QRCode value={customerId} />
        </div>
      )}
    </div>
  );
};

export default LoyaltyProgram;
