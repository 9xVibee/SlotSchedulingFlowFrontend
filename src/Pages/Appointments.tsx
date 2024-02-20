import AvailabelSlot from "@/components/AvailabelSlot";
import { Button } from "@/components/ui/button";
import useBookUnBookSlots from "@/hooks/useBookUnBookSlots";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Skeletons from "./Skeleton";
import { useEffect, useState } from "react";
import { useUserDetails } from "@/utils/store";
import axios from "axios";

const Appointments = () => {
  const navigate = useNavigate();
  const [booked, setBooked] = useState(false);
  const [isExist, setExist] = useState(false);

  const { user } = useUserDetails();

  const { loading, filteredSlots, getBookedSlots, getUnBookedSlots } =
    useBookUnBookSlots();

  //! redirecting the physio to create a slot on sunday
  const redirectThePhysio = () => {
    const curDate = new Date();

    if (curDate.getDay() == 3 || curDate.getDay() == 4 || curDate.getDay() == 3)
      navigate("/createslot");
    else
      toast("Slot can only be create on sunday", {
        position: "top-center",
      });
  };

  const handleIsExist = async () => {
    try {
      const res = await axios.get(
        // "http://localhost:3000/api/physio/is-already-submitted"
        "https://slotschedulingflowbackend.onrender.com/api/physio/isalreadysubmitted"
      );

      setExist(res?.data?.isExist);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleIsExist();
  }, []);

  // checking if the loged in user is physio or not!
  if (user.role != "physio" || !user.role) {
    navigate("/");
    toast("Only physio can access this page");
    return;
  }

  return (
    <div className="w-full h-screen pt-[3rem] flex flex-col gap-8 max-md:px-2">
      <div className="flex flex-col gap-2 max-md:mt-6">
        <div className="w-full flex justify-between items-center py-2">
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
            className="font-bold text-4xl sm:text-5xl md:text-6xl uppercase"
          >
            Appointments.
          </motion.h1>
        </div>
        <div className="flex justify-between w-full">
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
            className="flex gap-2"
          >
            <Button
              onClick={() => {
                setBooked(!booked);
                getBookedSlots();
              }}
              disabled={booked}
            >
              Booked
            </Button>
            <Button
              onClick={() => {
                setBooked(!booked);
                getUnBookedSlots();
              }}
              disabled={!booked}
            >
              Not-Booked
            </Button>
          </motion.div>
          {!isExist && (
            <Button onClick={redirectThePhysio}>Slot Availability</Button>
          )}
        </div>
      </div>

      {/* availabel slots */}
      <div className="hideScrollBar w-full flex flex-col h-3/4 overflow-y-scroll gap-4 py-2">
        {filteredSlots?.map((slot, idx) => {
          if (loading) return <Skeletons />;
          else
            return (
              <AvailabelSlot
                time={slot.slotStartTime}
                day={slot.day}
                key={idx}
                physioName={slot.physioName}
                remark={slot.remark}
                isAllocated={slot.isAllocated}
                _id={slot._id}
                role={"physio"}
              />
            );
        })}
      </div>
    </div>
  );
};

export default Appointments;
