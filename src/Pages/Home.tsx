/* eslint-disable no-constant-condition */
import { Button } from "@/components/ui/button";
import { useUserDetails } from "@/utils/store";
import { motion } from "framer-motion";
import { BellRing } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useUserDetails();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-full h-fit">
        <div className="w-full h-fit py-2 overflow-hidden flex justify-center items-center">
          <motion.h1
            initial={{
              y: 100,
            }}
            animate={{
              y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="text-4xl sm:text-5xl md:text-7xl uppercase font-bold transform"
          >
            Fix Health.com
          </motion.h1>
        </div>
        <div className="w-full h-fit overflow-hidden flex justify-center items-center">
          <motion.p
            initial={{
              y: 100,
            }}
            animate={{
              y: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="text-[0.8rem] md:text-[1rem] text-gray-600 uppercase transform"
          >
            Book your slot for 1v1 section with the physio.
          </motion.p>
        </div>
        <div className="w-full mt-6 h-fit overflow-hidden flex justify-center items-center">
          <motion.div
            initial={{
              y: 100,
            }}
            animate={{
              y: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-[1rem] text-gray-600 uppercase transform"
          >
            <Link
              to={
                !user.role
                  ? "/login"
                  : user.role == "admin" || "patient"
                  ? "/slot-scheduling"
                  : user.role == "physio"
                  ? "/appointments"
                  : ""
              }
            >
              <Button className="flex justify-center items-center gap-2">
                Book Appointment <BellRing className="size-5 mt-[0.2rem]" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
