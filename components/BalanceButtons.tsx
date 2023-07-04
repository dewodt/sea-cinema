"use client";

import { useState } from "react";
import BalancePopUp from "./BalancePopUp";
import Button from "./Button";

const BalanceButtons = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        popUp={<BalancePopUp type="withdraw" setLoading={setLoading} />}
        fullWidth={true}
        color="trans-red"
        disabled={loading}
      >
        Withdraw
      </Button>
      <Button
        popUp={<BalancePopUp type="topup" setLoading={setLoading} />}
        fullWidth={true}
        color="red"
        disabled={loading}
      >
        Top Up
      </Button>
    </>
  );
};

export default BalanceButtons;
