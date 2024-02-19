/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUserDetails } from "@/utils/store";
import { createSlotType } from "@/utils/types";
import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const useCreateSlot = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUserDetails();

  const handleCreateSlot = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!time || !date) {
      return toast("Provide Date and time! OF THIS WEEKK");
    }

    // Get the current date
    const currentDate = new Date();

    // Add 7 days to the current date
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 5);

    const weekStart = currentDate.toISOString().slice(0, 10);
    const weekEnd = futureDate.toISOString().slice(0, 10);

    const slotStartTime = time;
    const slotEndTime = Number(time.slice(0, 2)) + 1 + ":" + time.slice(3, 5);
    const remark = "";

    // Assuming dateStr is in the format "yyyy:mm:dd"
    const dateStr = date;

    // Convert the string to a Date object
    const dateArray = dateStr.split("-");

    const dateObject = new Date(
      Number(dateArray[0]),
      Number(dateArray[1]) - 1,
      Number(dateArray[2])
    );

    // Define an array of day names
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    // Get the day index from the Date object
    const dayIndex = dateObject.getDay();

    // Get the day name using the index
    const day = daysOfWeek[dayIndex];

    CreateSlot({
      date,
      slotStartTime,
      day,
      email: user.email,
      remark,
      slotEndTime,
      weekEnd,
      weekStart,
    });
  };

  //! requesting backend for new slot
  const CreateSlot = async ({
    date,
    day,
    email,
    remark,
    slotEndTime,
    slotStartTime,
    weekEnd,
    weekStart,
  }: createSlotType) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://slotschedulingflowbackend.onrender.com/api/physio/slots",
        {
          date,
          day,
          email,
          remark,
          slotEndTime,
          slotStartTime,
          weekEnd,
          weekStart,
        }
      );
      toast(res?.data?.message);
      setLoading(false);
      setTime("");
      setDate("");
    } catch (err: any) {
      setLoading(false);
      toast(err?.response?.data?.message);
      console.log(err);
    }
  };

  return { handleCreateSlot, setTime, setDate, time, date, loading };
};

export default useCreateSlot;
