import { motion } from "framer-motion";

import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useCreateSlot from "@/hooks/useCreateSlot";

const CreateSlot = () => {
  //! extracting date and time from custom hook
  const { handleCreateSlot, setDate, setTime, date, time, loading } =
    useCreateSlot();

  //! checking if date is from same week or not
  const handleDateChange = (date: string) => {
    // Get the current date
    const currentDate = new Date();

    // Add 7 days to the current date
    let futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 6);

    if (futureDate.getDate() !== currentDate.getDate() + 6) {
      futureDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
    }

    if (
      Number(date.toString().slice(8)) > currentDate.getDate() &&
      Number(date.toString().slice(8)) <= futureDate.getDate()
    ) {
      setDate(date);
    } else {
      toast("Select date between this week", {
        duration: 1500,
      });
    }
  };

  return (
    <div className="w-full h-full max-md:px-2 pt-[1rem] flex justify-center items-center flex-col gap-8">
      <div className="w-full flex justify-center items-center py-2 overflow-y-hidden">
        <motion.h1
          initial={{
            y: 100,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="font-bold text-5xl md:text-6xl uppercase"
        >
          Create Slot.
        </motion.h1>
      </div>
      <form
        onSubmit={(e) => {
          handleCreateSlot(e);
        }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <label className="text-xl">Select the Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              handleDateChange(e.target.value);
            }}
            className="w-[22rem] sm:w-[23.5rem]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Select the Time: (24 hours wise)</label>
          <input
            type="time"
            className="text-black w-[22rem] sm:w-[23.5rem] rounded-md py-1 outline-none border"
            value={time}
            onChange={(e) => setTime(String(e.target.value))}
          />
        </div>
        <Button
          type="submit"
          className="w-[22rem] sm:w-[23.5rem] flex items-center gap-2"
          disabled={loading}
        >
          Create Slot <PlusCircle className="size-4 mt-[0.1rem]" />
        </Button>
      </form>
    </div>
  );
};

export default CreateSlot;
