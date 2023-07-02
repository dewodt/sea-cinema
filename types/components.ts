import type { Dispatch, SetStateAction } from "react";

export type PopUpContextType = Dispatch<
  SetStateAction<React.ReactNode | undefined>
>;
