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

  //! hanlding day change
  const handleDayChange = (day: string, filtermood: string) => {
    console.log(day, filtermood);

    if (filtermood !== "" || day !== "") {
      const dayByFilteredSlots = slots.filter((slot) => {
        return (
          (slot.day == day || slot.day == "") &&
          (filtermood == "" ||
            (filtermood == "evening" &&
              slot.slotStartTime <= "23:59" &&
              slot.slotStartTime > "18:00") ||
            (filtermood == "morning" &&
              slot.slotStartTime >= "06:00" &&
              slot.slotStartTime < "12:00") ||
            (filtermood == "afternoon" &&
              slot.slotStartTime >= "12:00" &&
              slot.slotStartTime < "18:00"))
        );
      });
      setFilteredSlots(dayByFilteredSlots);
    } else setFilteredSlots(slots);
  };

  //! handling eve change
  const handleEveChange = (filtermood: string, day: string) => {
    if (filtermood !== "" || day !== "") {
      const dayByFilteredSlots = slots.filter((slot) => {
        if (filtermood == "evening") {
          return (
            slot.slotStartTime <= "23:59" &&
            slot.slotStartTime > "18:00" &&
            (day !== "" || day == slot.day)
          );
        } else if (filtermood == "morning") {
          return (
            slot.slotStartTime >= "06:00" &&
            slot.slotStartTime < "12:00" &&
            (day === "" || day == slot.day)
          );
        } else if (filtermood == "afternoon") {
          return (
            slot.slotStartTime >= "12:00" &&
            slot.slotStartTime < "18:00" &&
            (day === "" || day == slot.day)
          );
        }
      });
      setFilteredSlots(dayByFilteredSlots);
    } else setFilteredSlots(slots);
  };

  return {
    filteredSlots,
    loading,
    getAllSlots,
    handleDayChange,
    handleEveChange,
  };
};

export default useSlotScheduling;
