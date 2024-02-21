import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import useSlotScheduling from "./useSlotScheduling";

const useSlotAllocation = () => {
  const [loading, setLoading] = useState(false);
  const { handleSlots } = useSlotScheduling();

  const handleSlotAllocation = async (_id: string, remark: string) => {
    console.log(_id);

    try {
      setLoading(true);
      const res = await axios.post(
        `https://slotschedulingflowbackend.onrender.com/api/admin/slot/${_id}`,
        {
          remark,
        }
      );

      toast(res?.data?.message);
      // calling this function to update the particular task with isAllocation = true and remark = remark
      handleSlots(_id, remark);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { handleSlotAllocation, loading };
};

export default useSlotAllocation;
