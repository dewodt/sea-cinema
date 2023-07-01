"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "./Button";
import Seat from "./Seat";

const BookForm = ({
  title,
  price,
  date,
  soldSeats,
}: {
  title: string;
  price: number;
  date: string;
  soldSeats: Array<number>;
}) => {
  const [selectedSeats, setSelectedSeats] = useState<Array<number>>([]);
  return (
    <form className="flex h-fit w-full max-w-xl flex-col items-start gap-5 font-inter text-custom-white xl:max-w-2xl xl:gap-7">
      {/* Explain icon meaning div */}
      <section className="flex flex-row flex-wrap gap-x-4 gap-y-2 text-base font-medium xl:gap-6 xl:text-lg">
        {/* Available seat */}
        <div className="flex flex-row items-center gap-2 xl:gap-3">
          <Image
            className="aspect-square w-7"
            src="/seat_free.png"
            alt="Free Seat"
            width={21}
            height={21}
          />
          <p>Available</p>
        </div>
        {/* Picked seat */}
        <div className="flex flex-row items-center gap-2">
          <Image
            className="aspect-square w-7"
            src="/seat_picked.png"
            alt="Picked Seat"
            width={21}
            height={21}
          />
          <p>Your Seats</p>
        </div>
        {/* Sold seat */}
        <div className="flex flex-row items-center gap-2">
          <Image
            className="aspect-square w-7"
            src="/seat_sold.png"
            alt="Sold Seat"
            width={21}
            height={21}
          />
          <p>Sold</p>
        </div>
      </section>

      {/* Show selected seats and other show time information */}
      <section>
        <h1 className="text-lg font-bold xl:text-xl">{title}</h1>
        <ul className="text-base font-normal xl:text-lg">
          <li>
            Seats: {selectedSeats.length !== 0 ? selectedSeats.join(", ") : "-"}
          </li>
          <li>Tickets: {selectedSeats.length}/6</li>
          <li>
            Date:{" "}
            {new Date(parseInt(date)).toLocaleString("en-US", {
              calendar: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </li>
          <li>
            Total Payment:{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(selectedSeats.length * price)}
          </li>
        </ul>
      </section>

      {/* Seats div */}
      <section className="flex w-fit flex-col items-center gap-4 self-center xl:gap-5">
        <div className="grid w-fit grid-cols-8 gap-3 xl:gap-4">
          {Array.from({ length: 64 }, (_, index) => {
            return (
              <Seat
                value={index + 1}
                key={index}
                isSold={soldSeats.includes(index + 1)}
                isReachedLimit={selectedSeats.length === 6}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
              />
            );
          })}
        </div>
        <p className="text-2xl font-bold xl:text-3xl">SCREEN</p>
      </section>

      {/* Confirm / Cancel order div */}
      <section className="flex w-full max-w-[308px] flex-row items-center gap-5 self-center xl:max-w-[336px] xl:gap-6">
        {/* Disable all button when sending form */}
        {/* Disable submit button when 0 seats */}
        <Button color="trans-red" fullWidth={true}>
          Cancel
        </Button>
        <Button
          color="red"
          fullWidth={true}
          disabled={selectedSeats.length === 0}
        >
          Confirm
        </Button>
      </section>
    </form>
  );
};

export default BookForm;
