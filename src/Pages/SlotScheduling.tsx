import { motion } from "framer-motion";
import * as React from "react";
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
  const [openDay, setOpenDay] = React.useState(false);
  const [openEve, setOpenEve] = React.useState(false);
  const [day, setDay] = React.useState("");
  const [eve, setEve] = React.useState("");
  const { user } = useUserDetails();

  const {
    loading,
    filteredSlots,
    getAllSlots,
    unBookedSlots,
    handleDayChange,
    handleEveChange,
  } = useSlotScheduling();

  React.useEffect(() => {
    getAllSlots();
    if (user.role == "patient") unBookedSlots();
  }, []);

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
                        setDay(currentValue === day ? "" : currentValue);
                        setOpenDay(false);
                        handleDayChange(currentValue);
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
                  : "Select Day"}
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
                        setEve(currentValue === eve ? "" : currentValue);
                        setOpenEve(false);
                        handleEveChange();
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
        {filteredSlots.map((slot, idx) => {
          if (loading) return <Skeletons />;
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
              />
            );
        })}
      </motion.div>
    </div>
  );
};

export default SlotScheduling;
