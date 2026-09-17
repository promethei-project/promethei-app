import {
  StepperAction,
  StepperState,
} from "@promethei-project/promethei-app-components";
import {
  PrometheiAvailability,
  PrometheiNodeSpace,
  PrometheiReservation,
} from "@promethei-project/promethei-sdk-js";
import { Dispatch } from "react";

export type AvailabilityState = {
  id?: string;
  totalSize: number;
  duration: number;
  durationUnit: "hours" | "days" | "months";
  minPricePerBytePerSecond: number;
  totalCollateral: number;
  totalSizeUnit: "gb" | "tb";
  name?: string;
};

export type AvailabilityComponentProps = {
  dispatch: Dispatch<StepperAction>;
  state: StepperState;
  space: PrometheiNodeSpace;
  onAvailabilityChange: (data: Partial<AvailabilityState>) => void;
  availability: AvailabilityState;
  error: Error | null;
  editAvailabilityValue?: number;
};

export type AvailabilityWithSlots = PrometheiAvailability & {
  name: string;
  slots: PrometheiReservation[];
};
