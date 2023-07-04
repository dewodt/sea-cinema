"use client";

import { useContext, useEffect, useRef } from "react";
import { PopUpContext } from "@/app/layout";
import type { PopUpContextType } from "@/types/components";
import Button from "./Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

const BookPopUp = ({
  id,
  title,
  date,
  seats,
  setLoading,
}: {
  title: string;
  id: string;
  date: string;
  seats: number[];
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  // Get setPopUp
  const setPopUp = useContext(PopUpContext) as PopUpContextType;

  // PopUp Rev
  const popUpRef = useRef<HTMLDivElement>(null);

  // Close PopUp
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If Userclick is in the black background stuff
      if (!popUpRef.current?.contains(event.target as Node)) {
        setPopUp(undefined);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPopUp]);

  // Handle Book Ticket
  const handleConfirmBook = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("id", id);
    formData.append("date", date);
    formData.append("seats", seats.toString());

    setLoading(true); // setLoading to false only if fail
    setPopUp(undefined);
    const toastId = toast.loading("Loading...");
    try {
      const res = await fetch("/api/book", { body: formData, method: "POST" });
      const resJSON = await res.json();

      toast.dismiss(toastId);
      if (res.ok) {
        // Purchase success
        toast.success(resJSON.message);
        router.refresh(); // Must use refresh, because push() only client side navigation (soft navigation)
        router.push("/tickets");
      } else {
        // Purchase fail
        setLoading(false);
        toast.error(resJSON.message);
      }
    } catch {
      // Network error
      setLoading(false);
      toast.dismiss(toastId);
      toast.error("Something went wrong!");
    }
  };

  const formattedDate = new Date(parseInt(date)).toLocaleString("en-US", {
    calendar: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="fixed inset-0 z-40 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-50">
      <section
        ref={popUpRef}
        className="relative flex h-fit w-[300px] cursor-default flex-col items-center gap-4 rounded-xl border-2 border-custom-light-red bg-custom-soft-black p-5 font-inter text-custom-white xl:w-96 xl:gap-6 xl:p-7"
      >
        <h1 className="text-xl font-bold xl:text-2xl">Booking</h1>
        <p className="text-center text-base font-normal xl:text-lg">
          {`Are you sure you want to book for ${title} on ${formattedDate} at seat(s) number ${seats.join(
            ", "
          )}?`}
        </p>
        <div className="flex w-full flex-row items-center gap-5">
          <Button
            color="trans-red"
            fullWidth={true}
            onClick={() => setPopUp(undefined)}
          >
            Cancel
          </Button>
          <Button color="red" fullWidth={true} onClick={handleConfirmBook}>
            Confirm
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BookPopUp;
