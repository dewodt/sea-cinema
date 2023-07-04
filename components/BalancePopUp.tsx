"use client";

import { FormEvent, useContext, useEffect, useRef } from "react";
import { PopUpContext } from "@/app/layout";
import type { PopUpContextType } from "@/types/components";
import TextField from "./TextField";
import Button from "./Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import type { Dispatch, SetStateAction } from "react";

const BalancePopUp = ({
  type,
  setLoading,
}: {
  type: "withdraw" | "topup";
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  // Get setPopUp
  const setPopUp = useContext(PopUpContext) as PopUpContextType;

  // PopUp Rev
  const popUpRef = useRef<HTMLFormElement>(null);

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

  // Top Up
  const handleSubmitTopUp = async (e: FormEvent) => {
    e.preventDefault();

    // Get topup amount
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = parseInt(formData.get("amount") as string);

    // Validate withdrawal limit, Error when
    // Input empty parseInt will return Nan
    // Input <= 0
    if (!amount || amount <= 0) {
      toast.error("Please fill the amount correctly!");
      return;
    }

    setPopUp(undefined);
    setLoading(true);
    const toastId = toast.loading("Loading...");
    try {
      // Send data to API Endpoint
      const res = await fetch("/api/topup", { body: formData, method: "POST" });
      const resJSON = await res.json();

      toast.dismiss(toastId);
      setLoading(false);
      if (res.ok) {
        // Topup success
        toast.success(resJSON.message);
        router.refresh();
      } else {
        // Topup failed
        toast.error(resJSON.message);
      }
    } catch {
      // Network error
      toast.dismiss(toastId);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  // Withdraw
  const handleSubmitWithdraw = async (e: FormEvent) => {
    e.preventDefault();

    // Get topup amount
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = parseInt(formData.get("amount") as string) * -1;

    // Validate withdrawal limit, Error when
    // Input empty or strings parseInt will return Nan
    // amount >= 0 or amount > -500000
    if (!amount || amount >= 0 || amount < -500000) {
      toast.error("Please fill the amount correctly!");
      return;
    }

    try {
      setPopUp(undefined);
      const toastId = toast.loading("Loading...");

      // Send data to API Endpoint
      const res = await fetch("/api/withdraw", {
        body: formData,
        method: "POST",
      });
      const resJSON = await res.json();

      toast.dismiss(toastId);
      if (res.ok) {
        // Topup success
        toast.success(resJSON.message);
        router.refresh();
      } else {
        // Topup failed
        toast.error(resJSON.message);
      }
    } catch {
      // Network error
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-50">
      <form
        ref={popUpRef}
        onSubmit={type === "topup" ? handleSubmitTopUp : handleSubmitWithdraw}
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
          name="amount"
          type="number"
        />

        <div className="flex w-full flex-row items-center gap-5">
          <Button
            color="trans-red"
            fullWidth={true}
            type="button"
            onClick={() => setPopUp(undefined)}
          >
            Cancel
          </Button>
          <Button color="red" fullWidth={true} type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BalancePopUp;
