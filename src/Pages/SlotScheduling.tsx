/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AvailabelSlot from "@/components/AvailabelSlot";
import Skeletons from "./Skeleton";
import useSlotScheduling from "@/hooks/useSlotScheduling";
import { useUserDetails } from "@/utils/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const days = [
  {
    value: "monday",
    label: "Monday",
  },
  {
    value: "tuesday",
    label: "Tuesday",
  },
  {
    value: "wednesday",
    label: "Wednesday",
  },
  {
    value: "thursday",
    label: "Thursday",
  },
  {
    value: "friday",
    label: "Friday",
  },
  {
    value: "saturday",
    label: "Saturday",
  },
];

const eveMood = [
  {
    value: "evening",
    label: "Evening",
  },
  {
    value: "morning",
    label: "Morning",
  },
  {
    value: "afternoon",
    label: "Afternoon",
  },
];

const SlotScheduling = () => {
  const { user } = useUserDetails();
  const navigate = useNavigate();

  const {
    loading,
    filteredSlots,
    getAllSlots,
    handleDayChange,
    handleEveChange,
    day,
    eve,
    openDay,
    openEve,
    setDay,
    setEve,
    setOpenDay,
    setOpenEve,
    slotAllocationLoading,
    handleSlotAllocation,
  } = useSlotScheduling();

  useEffect(() => {
    getAllSlots();
  }, []);

  if (!user.role || user.role == "physio") {
    navigate("/login");
    toast("login to access this page and Physio cannot access this page");
    return;
  }

  return (
    <div className="w-full max-md:px-2 h-screen pt-[2.4rem] flex flex-col gap-10">
      {/* Heading Section section */}
      <div className="w-full max-md:flex-col max-md:items-start max-md:mt-4 flex justify-between items-center py-2 ">
        {/* heading */}
        <motion.h1
          initial={{
            y: 60,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase"
        >
          Schedule Your Slot.
        </motion.h1>
        {/* dropdown */}
        <motion.div
          initial={{
            y: 60,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex mt-4 md:mt-0 gap-2 md:gap-4 max-md:flex-col"
        >
          <Popover open={openDay} onOpenChange={setOpenDay}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openDay}
                className="w-[200px] justify-between"
              >
                {day
                  ? days.find((dayss) => dayss.value === day)?.label
                  : "Select Day"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup>
                  {days.map((dayss) => (
                    <CommandItem
                      key={dayss.value}
                      value={dayss.value}
                      onSelect={(currentValue) => {
                        handleDayChange(
                          currentValue == day ? "" : currentValue,
                          eve
                        );
                        setDay(currentValue === day ? "" : currentValue);
                        setOpenDay(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          day === dayss.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {dayss.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover open={openEve} onOpenChange={setOpenEve}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openEve}
                className="w-[200px] justify-between"
              >
                {eve
                  ? eveMood.find((eveMoods) => eveMoods.value === eve)?.label
                  : "Select Mood"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup>
                  {eveMood.map((eveMoods) => (
                    <CommandItem
                      key={eveMoods.value}
                      value={eveMoods.value}
                      onSelect={(currentValue) => {
                        handleEveChange(
                          currentValue == eve ? "" : currentValue,
                          day
                        );
                        setEve(currentValue === eve ? "" : currentValue);
                        setOpenEve(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          eve === eveMoods.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {eveMoods.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </motion.div>
      </div>
      {/* Availabel Slots */}
      <motion.div
        initial={{
          y: 60,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="w-full flex flex-col overflow-y-scroll h-3/4 gap-4 py-2 hideScrollBar"
      >
        {filteredSlots?.map((slot, idx) => {
          if (loading) return <Skeletons />;
          else if (user.role == "patient" && slot.isAllocated) return null;
          else
            return (
              <AvailabelSlot
                _id={slot._id}
                role={user.role}
                time={slot.slotStartTime}
                day={slot.day}
                physioName={slot.physioName}
                remark={slot.remark}
                isAllocated={slot.isAllocated}
                key={idx}
                slotAllocationLoading={slotAllocationLoading}
                handleSlotAllocation={handleSlotAllocation}
              />
            );
        })}
        {filteredSlots?.filter((item) => item.isAllocated == false).length ==
          0 &&
          user.role == "patient" && (
            <p className="text-center text-xl">No slots available</p>
          )}
      </motion.div>
    </div>
  );
};

export default SlotScheduling;
