import AvailabelSlot from "@/components/AvailabelSlot";
import { Button } from "@/components/ui/button";
import useBookUnBookSlots from "@/hooks/useBookUnBookSlots";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Skeletons from "./Skeleton";
import { useState } from "react";

const Appointments = () => {
  const navigate = useNavigate();
  const [booked, setBooked] = useState(false);

  const { loading, filteredSlots, getBookedSlots, getUnBookedSlots } =
    useBookUnBookSlots();

  //! redirecting the physio to create a slot on sunday
  const redirectThePhysio = () => {
    const curDate = new Date();

    if (curDate.getDay() == 1) navigate("/createslot");
    else
      toast("Slot can only be create on sunday", {
        position: "top-center",
      });
  };

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
          {<Button onClick={redirectThePhysio}>Slot Availability</Button>}
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
