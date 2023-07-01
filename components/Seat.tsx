"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const Seat = ({
  value,
  isSold,
  isReachedLimit,
  selectedSeats,
  setSelectedSeats,
}: {
  value: number;
  isSold: boolean;
  isReachedLimit: boolean;
  selectedSeats: Array<number>;
  setSelectedSeats: React.Dispatch<React.SetStateAction<Array<number>>>;
}) => {
  // Value: seat number or undefined.
  const [selectedValue, setSelectedValue] = useState<undefined | number>(
    undefined
  );

  return (
    // Cursor logic
    <div
      className={`${
        isReachedLimit
          ? selectedValue
            ? "cursor-pointer"
            : "cursor-not-allowed"
          : isSold
          ? "cursor-not-allowed"
          : "cursor-pointer"
      }`}
      onClick={() => {
        // Only update state if seat is not selected, not sold, and not reached limit.
        if (!selectedValue && !isSold && !isReachedLimit) {
          setSelectedValue(value);
          setSelectedSeats([...selectedSeats, value].sort((a, b) => a - b));
        } else {
          setSelectedValue(undefined);
          setSelectedSeats(selectedSeats.filter((seat) => seat !== value));
        }
      }}
    >
      <Image
        src={
          isSold
            ? "/seat_sold.png"
            : selectedValue
            ? "/seat_picked.png"
            : "/seat_free.png"
        }
        alt={`Seat ${value}`}
        className="aspect-square w-7"
        width={20}
        height={20}
      />
      <input className="hidden" value={selectedValue} type="checkbox" />
    </div>
  );
};

export default Seat;
