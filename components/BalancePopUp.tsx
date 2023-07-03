"use client";

import { useContext, useEffect, useRef } from "react";
import { PopUpContext } from "@/app/layout";
import type { PopUpContextType } from "@/types/components";
import TextField from "./TextField";
import Button from "./Button";
import toast from "react-hot-toast";

const BalancePopUp = ({ type }: { type: "withdraw" | "topup" }) => {
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

  return (
    <div className="fixed inset-0 z-40 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-50">
      <section
        ref={popUpRef}
        className="relative flex h-fit w-[300px] cursor-default flex-col items-center gap-4 rounded-xl border-2 border-custom-light-red bg-custom-soft-black p-5 font-inter text-custom-white xl:w-96 xl:gap-6 xl:p-7"
      >
        <h1 className="text-xl font-bold xl:text-2xl">
          {type === "topup" ? "Top Up" : "Withdraw"}
        </h1>
        <p className="text-center text-base font-normal xl:text-lg">
          {type === "topup"
            ? "Add balance to your account"
            : "Withdraw balance from your account (max Rp500.000,00)"}
        </p>
        <TextField
          placeholder={
            type === "topup"
              ? "Insert top up amount"
              : "Insert withdrawal amount"
          }
          name={type === "topup" ? "topup" : "withdraw"}
          type="number"
        />
        <div className="flex w-full flex-row items-center gap-5">
          <Button
            color="trans-red"
            fullWidth={true}
            onClick={() => setPopUp(undefined)}
          >
            Cancel
          </Button>
          <Button color="red" fullWidth={true}>
            Confirm
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BalancePopUp;
