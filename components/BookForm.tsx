"use client";

import Image from "next/image";
import { useState, useContext } from "react";
import Button from "./Button";
import Seat from "./Seat";
import BookPopUp from "./BookPopUp";
import { useRouter } from "next/navigation";
import { PopUpContext } from "@/app/layout";
import type { PopUpContextType } from "@/types/components";
import { toast } from "react-hot-toast";

const BookForm = ({
  id,
  title,
  price,
  date,
  soldSeats,
}: {
  id: string;
  title: string;
  price: number;
  date: Date;
  soldSeats: Array<number>;
}) => {
  // Store selected seats
  const [selectedSeats, setSelectedSeats] = useState<Array<number>>([]);

  // Loading state to disable cancel/submit button.
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Use router for cancel button to prevent remount (Without using useRouter, a remount will occured: one with link and one without link)

  // Get setPopUp
  const setPopUp = useContext(PopUpContext) as PopUpContextType;

  const formattedDate = date.toLocaleString("en-US", {
    calendar: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

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
          <li>Date: {formattedDate}</li>
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
        <Button
          color="trans-red"
          fullWidth={true}
          disabled={loading}
          onClick={!loading ? () => router.push(`/${id}`) : () => {}}
        >
          Cancel
        </Button>
        <Button
          color="red"
          fullWidth={true}
          disabled={loading}
          onClick={
            selectedSeats.length === 0
              ? () => toast.error("Pick atleast one seat!")
              : () =>
                  setPopUp(
                    <BookPopUp
                      id={id}
                      date={date}
                      seats={selectedSeats}
                      title={title}
                      setLoading={setLoading}
                    />
                  )
          }
        >
          Confirm
        </Button>
      </section>
    </form>
  );
};

export default BookForm;
