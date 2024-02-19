import { slotType } from "@/utils/types";
import axios from "axios";
import { useState } from "react";

const useSlotScheduling = () => {
  const [slots, setSlots] = useState<slotType[]>([]);
  const [filteredSlots, setFilteredSlots] = useState<slotType[]>([]);
  const [loading, setLoading] = useState(false);

  //! getting all slots
  const getAllSlots = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://slotschedulingflowbackend.onrender.com/api/slots"
      );

      setSlots(res?.data?.slots);
      setFilteredSlots(res?.data?.slots);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //! get all unbooked slots
  const unBookedSlots = async () => {
    const unBookedSlots = slots.filter((slot) => !slot.isAllocated);
    setFilteredSlots(unBookedSlots);
  };

  //! hanlding day change
  const handleDayChange = (day: string) => {
    const dayByFilteredSlots = slots.filter((slot) => slot.day == day);
    setFilteredSlots(dayByFilteredSlots);
  };

  //! handling eve change
  const handleEveChange = (filtereve: string) => {
    const dayByFilteredSlots = slots.filter((slot) => {
      if (filtereve == "evening") {
        return slot.slotStartTime <= "23:59" && slot.slotStartTime > "18:00";
      } else if (filtereve == "morning") {
        return slot.slotStartTime >= "06:00" && slot.slotStartTime < "12:00";
      } else if (filtereve == "afternoon") {
        return slot.slotStartTime >= "12:00" && slot.slotStartTime < "18:00";
      }
    });
    setFilteredSlots(dayByFilteredSlots);
  };

  return {
    filteredSlots,
    loading,
    getAllSlots,
    unBookedSlots,
    handleDayChange,
    handleEveChange,
  };
};

export default useSlotScheduling;
