"use client";

import Button from "./Button";
import CancelPopUp from "./CancelPopUp";
import { useState } from "react";

const CancelBookButton = ({
  id,
  title,
  date,
  seat,
}: {
  id: string;
  title: string;
  date: Date;
  seat: number;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      paddingY="10px"
      paddingX="15px"
      color="trans-red"
      disabled={loading}
      popUp={
        <CancelPopUp
          id={id}
          title={title}
          date={date}
          seat={seat}
          setLoading={setLoading}
        />
      }
    >
      Cancel
    </Button>
  );
};

export default CancelBookButton;
