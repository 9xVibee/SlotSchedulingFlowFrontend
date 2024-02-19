import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useSlotAllocation = () => {
  const [loading, setLoading] = useState(false);

  const handleSlotAllocation = async (_id: string, remark: string) => {
    console.log(_id);

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:3000/api/admin/slot/${_id}`,
        {
          remark,
        }
      );

      toast(res?.data?.message);
      // reaload page using window object
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { handleSlotAllocation, loading };
};

export default useSlotAllocation;
