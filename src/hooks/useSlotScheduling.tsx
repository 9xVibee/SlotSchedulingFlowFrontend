/* eslint-disable react-refresh/only-export-components */
import { slotType } from "@/utils/types";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useSlotScheduling = () => {
  const [openDay, setOpenDay] = useState(false);
  const [openEve, setOpenEve] = useState(false);
  const [day, setDay] = useState("");
  const [eve, setEve] = useState("");
  const [slots, setSlots] = useState<slotType[]>();
  const [filteredSlots, setFilteredSlots] = useState<slotType[]>();
  const [loading, setLoading] = useState(false);
  const [slotAllocationLoading, setSlotAllocationLoading] = useState(false);

  //! getting all slots
  const getAllSlots = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://slotschedulingflowbackend-production-ce74.up.railway.app/api/slots"
      );

      setLoading(false);
      setFilteredSlots(res?.data?.slots);
      setSlots(res?.data?.slots);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //! hanlding day change
  const handleDayChange = (day: string, filtermood: string) => {
    console.log(day, filtermood);

    if (filtermood !== "" || day !== "") {
      const dayByFilteredSlots = slots?.filter((slot) => {
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
      const dayByFilteredSlots = slots?.filter((slot) => {
        if (filtermood == "" && day == slot.day) {
          return true;
        } else if (filtermood == "evening") {
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

  //! handle slots after allocation
  const handleSlots = (_id: string, remark: string) => {
    const updatedSlots = slots?.map((slot) => {
      if (slot._id == _id) {
        slot.isAllocated = true;
        slot.remark = remark;
      }
      return slot;
    });

    console.log(updatedSlots);
    setSlots(updatedSlots);
    setFilteredSlots(updatedSlots);
  };

  const handleSlotAllocation = async (_id: string, remark: string) => {
    try {
      setSlotAllocationLoading(true);
      const res = await axios.post(
        `https://slotschedulingflowbackend-production-ce74.up.railway.app/api/admin/slot/${_id}`,
        {
          remark,
        }
      );

      toast(res?.data?.message);
      // calling this function to update the particular task with isAllocation = true and remark = remark
      setSlotAllocationLoading(false);
      handleSlots(_id, remark);
    } catch (err) {
      console.log(err);
      setSlotAllocationLoading(false);
    }
  };

  return {
    filteredSlots,
    loading,
    getAllSlots,
    handleDayChange,
    handleEveChange,
    setDay,
    setEve,
    eve,
    day,
    openDay,
    openEve,
    setOpenDay,
    setOpenEve,
    handleSlotAllocation,
    slotAllocationLoading,
  };
};

export default useSlotScheduling;
